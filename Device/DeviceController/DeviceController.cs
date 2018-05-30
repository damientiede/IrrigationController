using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.NetworkInformation;
using DeviceController.IO;
using DeviceController.IO.Solenoids;
using DeviceController.IO.Analogs;
using DeviceController.IO.Alarms;
using DeviceController.IO.Spis;
using DeviceController.Data;
using System.Threading;
using System.Net.Http;
using System.Net.Http.Headers;
using log4net;


namespace DeviceController
{    
    public class DeviceController
    {
        ILog log;
        bool bShutdown = false;
        private string dataServerUrl;        
        
        //private int deviceId = -1;
        private string macAddress = String.Empty;
        //private IOFactory ioFactory;
        private InterfaceService interfaceService;        

        ISolenoid PumpSolenoid;       
        ActiveIrrigationProgram ActiveProgram;
        ISolenoid ActiveSolenoid;

        Device device;
        Schedule ActiveSchedule;      

        public DeviceController(string url)
        {
            log4net.Config.XmlConfigurator.Configure();            
            log = LogManager.GetLogger("Device");
            
            interfaceService = new InterfaceService(url);           
            Init();            
        }
        
        protected void Init()
        {
            try
            {
                log.Info("=====================================================");
                log.InfoFormat("DeviceController.Init(): Initializing device...");
                //get device mac address
                macAddress =
                (
                    from nic in NetworkInterface.GetAllNetworkInterfaces()
                    where nic.OperationalStatus == OperationalStatus.Up
                    select nic.GetPhysicalAddress().ToString()
                ).FirstOrDefault();
                if (string.IsNullOrEmpty(macAddress))
                {
                    throw new Exception("Could not read device mac address");
                }

                //register with server
                while (device == null)
                {
                    try
                    {
                        log.DebugFormat("Registering device {0} with server...", macAddress);
                        // Register();
                        device = interfaceService.Register(macAddress);
                        //device = new Device();
                        if (device == null)
                        {
                            Thread.Sleep(5000);
                        }
                    }
                    catch (Exception ex)
                    {
                        log.Error(ex.Message);
                        Thread.Sleep(5000);
                    }
                }

                //dataServer.DeviceId = device.Id;
                log.DebugFormat("DeviceController start, registered with deviceId:{0}", device.Id);
                interfaceService.CreateEvent(EventTypes.Application, string.Format("DeviceController start, registered with deviceId:{0}", device.Id));

                interfaceService.LoadConfig();

                //gpio.Open();
            }
            catch (Exception ex)
            {
                log.ErrorFormat("Initialization failure: {0}", ex.Message);
                throw ex;
            }
        }
        

        public void Run()
        {
            while (!bShutdown)
            {
                if (device != null)
                {
                    try
                    {
                        //get commands
                        ProcessCommands();
                      
                        //read analogs
                        interfaceService.ReadAnalogs();
                        device.Pressure = interfaceService.Analogs[0].Data.Value;
                        log.DebugFormat("device.Pressure: {0} kPa", device.Pressure);

                        if (ActiveProgram != null)
                        {
                            device.State = DeviceState.Irrigating;

                            //check to see if program is finished
                            if (ActiveProgram.Completed)
                            {
                                //program finished
                                interfaceService.SwitchSolenoid(ActiveProgram.SolenoidId, false);
                                interfaceService.CreateEvent(EventTypes.IrrigationStop, string.Format("{0} completed", ActiveProgram.Name));
                                log.DebugFormat("Program {0} completed", ActiveProgram.Name);
                                ActiveProgram.Finished = DateTime.Now;
                                interfaceService.UpdateIrrigationProgram(ActiveProgram);                                
                                                                
                                ActiveProgram = null;
                                ActiveSolenoid = null;
                               
                                device.State = DeviceState.Standby;
                            }
                        }
                        else
                        {
                            device.State = DeviceState.Standby;
                        }

                        if (device.Mode == DeviceMode.Auto)
                        {
                            if (ActiveProgram == null)
                            {
                                if (device.State != DeviceState.Standby)
                                    device.State = DeviceState.Standby;

                                //check for next active schedule
                                foreach (Schedule s in interfaceService.Schedules)
                                {
                                    if (s.Enabled)
                                    {
                                        //log.DebugFormat("Schedule {0}", s.Name);
                                        if (!s.Repeat)
                                        {
                                            //its a one off schedule - delete when finished

                                        }
                                        else
                                        {
                                            //see if schedule has come into active window
                                            int dayOfWeek = (int)DateTime.Now.DayOfWeek;
                                            if (s.Days.Contains(dayOfWeek.ToString()))
                                            {
                                                DateTime start = new DateTime(
                                                    DateTime.Now.Year,
                                                    DateTime.Now.Month,
                                                    DateTime.Now.Day,
                                                    s.StartHours,
                                                    s.StartMins,
                                                    0);

                                                if ((DateTime.Now > start) && (DateTime.Now <= start.AddMinutes(s.Duration)))
                                                {
                                                    //new active schedule
                                                    ActiveSchedule = s;
                                                    ActiveProgram  = interfaceService.CreateIrrigationProgram(s.Name, s.Duration, s.SolenoidId);

                                                    interfaceService.SwitchSolenoid(ActiveProgram.SolenoidId, true);
                                                    interfaceService.CreateEvent(EventTypes.IrrigationStart, string.Format("Repeating schedule '{0}' started", ActiveProgram.Name));
                                                    log.InfoFormat("Repeating schedule '{0}' started", ActiveProgram.Name);
                                                    device.State = DeviceState.Irrigating;
                                                    break;
                                                }
                                            }
                                        }
                                    }                                    
                                }
                            }
                        }                       

                        //update the server
                        ReportStatus();                        
                      
                    }
                    catch (Exception ex)
                    {
                        log.Error(ex.Message);
                    }

                    //powernap
                    Thread.Sleep(5000);
                }
            }

            interfaceService.Close();
            log.InfoFormat("Device controller shutdown.");
        }
        
        public  void ProcessCommands()
        {
            //log.Debug("ProcessCommands()");
            //get commands
            try
            {
                List<Command> commands =  interfaceService.GetCommands();
                //log.DebugFormat("Retrieved {0} commands", commands.Count());
                foreach (Command cmd in commands)
                {
                    log.DebugFormat("Command {0}", cmd.CommandType);
                    switch (cmd.CommandType)
                    {
                        //shutdown
                        case "Shutdown":
                            Shutdown();
                            ActionCommand(cmd);
                            break;
                        
                        //Switch to Auto
                        case "Auto":
                            if (device.Mode != DeviceMode.Auto)
                            {
                                log.Info("Switching to Auto mode");
                                interfaceService.CreateEvent(EventTypes.Application, "Switching to Auto mode");
                                device.Mode = DeviceMode.Auto;
                            }
                            ActionCommand(cmd);
                            break;

                        //Switch to Manual
                        case "Manual":
                            try
                            {
                                log.Info("Switching to Manual mode");
                                interfaceService.CreateEvent(EventTypes.Application, "Switching to Manual mode");
                                device.Mode = DeviceMode.Manual;

                                if (!string.IsNullOrEmpty(cmd.Params))
                                {
                                    //includes instructions to run irrigation manually
                                    string[] parts = cmd.Params.Split(',');
                                    int solenoidId = Int32.Parse(parts[0]);
                                    int duration = Int32.Parse(parts[1]);

                                    //abort the active program if it exists
                                    AbortProgram();

                                    //create the new program
                                    ActiveProgram = interfaceService.CreateIrrigationProgram("Manual program",duration,solenoidId);                                    
                                                                                              
                                    device.State = DeviceState.Irrigating;
                                    device.Status = string.Format("Irrigating Solenoid {0} for {1} minutes", ActiveProgram.SolenoidId, ActiveProgram.Duration);
                                    log.Info(device.Status);

                                    //switch on solenoid for manual program
                                    interfaceService.SwitchSolenoid(ActiveProgram.SolenoidId, true);

                                    interfaceService.CreateEvent(EventTypes.IrrigationStart,
                                        string.Format("Manual irrigation program: {0} for {1} minutes", ActiveProgram.SolenoidId, ActiveProgram.Duration));
                                }
                            }
                            catch (Exception ex)
                            {
                                log.ErrorFormat("Manual command failed, invalid parameters");
                                interfaceService.CreateEvent(EventTypes.Fault, "Manual command failed, invalid parameters");
                                device.Mode = DeviceMode.Manual;
                                device.State = DeviceState.Standby;                                
                            }
                            ActionCommand(cmd);
                            break;

                        //Off - turn off all solenoids
                        case "Stop":
                        case "Off":
                            interfaceService.SolenoidsOff();
                            device.State = DeviceState.Standby;
                            device.Mode = DeviceMode.Manual;

                            interfaceService.CreateEvent(EventTypes.Application, "Switching all solenoids off");
                            AbortProgram();

                            ActionCommand(cmd);
                            break;
                        
                        //Get schedules
                        case "GetSchedules":
                            log.Info("GetSchedules");
                            interfaceService.LoadSchedules();
                            ActionCommand(cmd);
                            break;

                        //load configuration
                        case "LoadConfig":
                            log.Info("LoadConfig");
                            interfaceService.LoadConfig();
                            ActionCommand(cmd);
                            break;
                    }
                }

            }
            catch (Exception ex)
            {
                log.ErrorFormat("GetCommands(): {0}", ex.Message);
            }

        }
        public void AbortProgram()
        {
            //abort the active program if it exists
            if (ActiveProgram != null)
            {
                interfaceService.SwitchSolenoid(ActiveProgram.SolenoidId, false);
                interfaceService.CreateEvent(EventTypes.IrrigationStop, string.Format("{0} aborted", ActiveProgram.Name));
                log.DebugFormat("Program {0} aborted", ActiveProgram.Name);
                ActiveProgram.Finished = DateTime.Now;
                interfaceService.UpdateIrrigationProgram(ActiveProgram);
                ActiveProgram = null;
                ActiveSolenoid = null;
            }
        }
        public  void ReportStatus()
        {                 
            if (device.Mode == DeviceMode.Auto)
            {
                if (ActiveProgram != null && ActiveSolenoid != null)
                {
                    device.Status = string.Format("Irrigating '{0}' from schedule '{1}'. {2} minutes remaining."
                        , ActiveSolenoid.Name, ActiveProgram.Name, ActiveProgram.MinsRemaining);
                }
                else
                {
                    device.Status = "Standby. Waiting for next scheduled program to start.";
                }
            }

            if (device.Mode == DeviceMode.Manual)
            {
                if (ActiveProgram != null && ActiveSolenoid !=null)
                {
                    device.Status = string.Format("Irrigating '{0}' - {1} minutes remaining."
                        , ActiveSolenoid.Name, ActiveProgram.MinsRemaining);
                }
                else
                {
                    device.Status = "Standing by in manual mode.";
                }
            }

            try
            {
                interfaceService.PutDevice(device);
            }
            catch (Exception ex)
            {
                log.ErrorFormat("ReportStatus(): {0}", ex.Message);
            }
        }
               
        public  void ActionCommand(Command cmd)
        {
            cmd.Actioned = DateTime.Now;
            interfaceService.PutCommand(cmd);
        }
        public void Shutdown()
        {
            log.Info("DeviceController application shutdown");
            interfaceService.CreateEvent(EventTypes.Application, "DeviceController application shutdown");
            bShutdown = true;
        }
        
    }
}
