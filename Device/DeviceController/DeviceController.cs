using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.NetworkInformation;
using DeviceController.IO;
using DeviceController.Data;
using DeviceController.Devices;
using System.Threading;
using log4net;


namespace DeviceController
{    
    public class DeviceController
    {
        ILog log;
        bool bShutdown = false;
        private string dataServerUrl;

        List<DeviceSolenoid> Solenoids;
        List<DeviceAnalog> Analogs;
        List<DeviceAlarm> Alarms;
        List<Schedule> Schedules;

        public static DeviceSolenoid Pump;
        public static int DeviceId;

        //private int deviceId = -1;
        private string macAddress = String.Empty;
        //private IOFactory ioFactory;

        //private HardwareService hardwareService;
        //private DataService dataService;
          
        DeviceProgram ActiveProgram;
        //ISolenoid ActiveSolenoid;

        Device device;
        Schedule ActiveSchedule;      

        public DeviceController()
        {
                      
            log = LogManager.GetLogger("Device");                         
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
                        device = DataService.Proxy.Register(macAddress);
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

                DeviceId = device.Id;
                log.DebugFormat("DeviceController start, registered with deviceId:{0}", DeviceId);
                DataService.CreateEvent(EventTypes.Application, string.Format("DeviceController start, registered with deviceId:{0}", device.Id),device.Id);

                Solenoids = new List<DeviceSolenoid>();
                Analogs = new List<DeviceAnalog>();
                Alarms = new List<DeviceAlarm>();
                Schedules = new List<Schedule>();

                LoadConfig();

            }
            catch (Exception ex)
            {
                log.ErrorFormat("Initialization failure: {0}", ex.Message);
                throw ex;
            }
        }
        public void LoadConfig()
        {
            Solenoids.Clear();
            List<Solenoid> solenoids = DataService.Proxy.GetSolenoids(device.Id);
            foreach (Solenoid s in solenoids)
            {
                DeviceSolenoid sol = new DeviceSolenoid(s);
                Solenoids.Add(sol);
                if (device.PumpSolenoid == sol.Id)
                {
                    Pump = sol;
                }
            }

            Analogs.Clear();
            List<Analog> analogs = DataService.Proxy.GetAnalogs(device.Id);
            foreach (Analog a in analogs)
            {
                DeviceAnalog an = new DeviceAnalog(a);
                Analogs.Add(an);
            }

            Alarms.Clear();
            List<Alarm> alarms = DataService.Proxy.GetAlarms(device.Id);
            foreach (Alarm a in alarms)
            {
                DeviceAlarm al = new DeviceAlarm(a);
                Alarms.Add(al);
            }
            
            Schedules = DataService.Proxy.GetSchedules(device.Id);            
        }
        public void ReadAnalogs()
        {
            foreach (DeviceAnalog analog in Analogs)
            {
                analog.Sample();                
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
                        ReadAnalogs();
                        device.Pressure = Analogs[0].Sample();
                        //log.DebugFormat("device.Pressure: {0} kPa", device.Pressure);

                        if (ActiveProgram != null)
                        {
                            device.State = DeviceState.Irrigating;

                            //check to see if program is finished
                            if (ActiveProgram.Completed)
                            {
                                //program finished
                                //interfaceService.SwitchSolenoid(ActiveProgram.SolenoidId, false);
                                //interfaceService.CreateEvent(EventTypes.IrrigationStop, string.Format("{0} completed", ActiveProgram.Name));
                                log.DebugFormat("Program {0} completed", ActiveProgram.Name);
                                ActiveProgram.Finished = DateTime.Now;
                                //interfaceService.UpdateIrrigationProgram(ActiveProgram);                                
                                                                
                                ActiveProgram = null;
                                //ActiveSolenoid = null;
                               
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
                                foreach (Schedule s in Schedules)
                                {
                                    if (s.Enabled)
                                    {
                                        log.DebugFormat("Schedule {0}", s.Name);
                                        if (!s.Repeat)
                                        {
                                            //its a one off schedule - delete when finished

                                        }
                                        else
                                        {                                           
                                            //see if schedule has come into active window
                                            int dayOfWeek = (int)DateTime.Now.DayOfWeek;
                                            //log.DebugFormat("DOW: {0} Today:{1}", s.Days, dayOfWeek);
                                            if (true)  //(s.Days.Contains(dayOfWeek.ToString()))
                                            {
                                                DateTime start = s.StartDate;//.ToUniversalTime();                                                    
                                                DateTime finish = start.AddMinutes(s.Duration);
                                                DateTime now = DateTime.Now;
                                                //log.DebugFormat("Now: {2} Start: {0} Finish: {1}",start.ToString(), finish.ToString(), now.ToString());                                              
                                                //if (now < start) { log.Debug("< start"); }
                                                //if (now <= finish) { log.Debug(" <= finish"); }
                                                if ((now > start) && (now <= finish))
                                                {
                                                    log.DebugFormat("Schedule window active: {0}", s.Name);
                                                    //new active schedule
                                                    ActiveSchedule = s;
                                                    ActiveProgram = new DeviceProgram(s.Name, GetSolenoidById(s.SolenoidId), s.Duration);
                                                    ActiveProgram.ProgramCompleted += OnProgramCompleted;

                                                        //interfaceService.CreateIrrigationProgram(s.Name, s.Duration, s.SolenoidId);

                                                    //interfaceService.SwitchSolenoid(ActiveProgram.SolenoidId, true);
                                                    DataService.CreateEvent(EventTypes.IrrigationStart, string.Format("Repeating schedule '{0}' started", ActiveProgram.Name),device.Id);
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

            GPIOService.Gpio.Close();
            log.InfoFormat("Device controller shutdown.");
        }
        
        public  void ProcessCommands()
        {
            log.Debug("ProcessCommands()");
            //get commands
            try
            {
                List<Command> commands =  DataService.Proxy.GetCommands(device.Id);
                log.DebugFormat("Retrieved {0} commands", commands.Count());
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
                                DataService.CreateEvent(EventTypes.Application, "Switching to Auto mode", device.Id);
                                device.Mode = DeviceMode.Auto;
                            }
                            ActionCommand(cmd);
                            break;

                        //Switch to Manual
                        case "Manual":
                            try
                            {
                                log.Info("Switching to Manual mode");
                                DataService.CreateEvent(EventTypes.Application, "Switching to Manual mode", device.Id);
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
                                    DeviceProgram p = new DeviceProgram("Manual program", 
                                        GetSolenoidById(solenoidId),
                                         duration);

                                    p.ProgramCompleted += OnProgramCompleted;

                                    //IrrigationProgram p = new IrrigationProgram()
                                    //ActiveProgram = interfaceService.CreateIrrigationProgram("Manual program",duration,solenoidId);                                    
                                                                                              
                                    device.State = DeviceState.Irrigating;
                                    device.Status = string.Format("Irrigating '{0}' for {1} minutes", ActiveProgram.Solenoid.Name, ActiveProgram.Duration);
                                    log.Info(device.Status);

                                    //switch on solenoid for manual program
                                    //interfaceService.SwitchSolenoid(ActiveProgram.SolenoidId, true);

                                    //interfaceService.CreateEvent(EventTypes.IrrigationStart,
                                       // string.Format("Manual irrigation program: {0} for {1} minutes", ActiveProgram.SolenoidId, ActiveProgram.Duration));
                                }
                            }
                            catch (Exception ex)
                            {
                                log.ErrorFormat(ex.Message);
                                log.ErrorFormat("Manual command failed, invalid parameters");
                                //interfaceService.CreateEvent(EventTypes.Fault, "Manual command failed, invalid parameters");
                                device.Mode = DeviceMode.Manual;
                                device.State = DeviceState.Standby;                                
                            }
                            ActionCommand(cmd);
                            break;

                        //Off - turn off all solenoids
                        case "Stop":
                        case "Off":
                            //interfaceService.SolenoidsOff();
                            device.State = DeviceState.Standby;
                            device.Mode = DeviceMode.Manual;

                            //interfaceService.CreateEvent(EventTypes.Application, "Switching all solenoids off");
                            AbortProgram();

                            ActionCommand(cmd);
                            break;
                        
                        //Get schedules
                        case "LoadSchedules":
                            log.Info("LoadSchedules");
                            //interfaceService.LoadSchedules();
                            ActionCommand(cmd);
                            break;

                        //load configuration
                        case "LoadConfig":
                            log.Info("LoadConfig");
                            //interfaceService.LoadConfig();
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

        private void OnProgramCompleted(object sender, EventArgs e)
        {
            log.DebugFormat("Program {0} completed", ActiveProgram.Name);
            ActiveProgram = null;
            device.State = DeviceState.Standby;
        }

        public DeviceSolenoid GetSolenoidById(int id)
        {
            return Solenoids.AsQueryable<DeviceSolenoid>().Where(s => s.Id == id).First<DeviceSolenoid>();
        }
        //public IrrigationProgram CreateIrrigationProgram(string name, int duration, int solenoidId)
        //{
        //    log.DebugFormat("InterfaceService.CreateIrrigationProgram() Name:{0} SolenoidId:{1}", name, solenoidId);
        //    SolenoidTuple st = null;
        //    foreach (SolenoidTuple s in Solenoids)
        //    {
        //        if (s.Data.Id == solenoidId)
        //        {
        //            st = s;
        //            break;
        //        }
        //    }
        //    if (st == null)
        //    {
        //        throw new Exception(string.Format("Unknown solenoidId '{0}'", solenoidId));
        //    }
        //    ActiveIrrigationProgram activeProgram = new ActiveIrrigationProgram(name, duration, solenoidId, st.Data.Name, device.Id);
        //    try
        //    {
        //        activeProgram.Id = dataServer.PostIrrigationProgram(activeProgram);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.ErrorFormat("CreateIrrigationProgram(): {0}", ex.Message);
        //    }
        //    return activeProgram;
        //}
        public void AbortProgram()
        {
            //abort the active program if it exists
            if (ActiveProgram != null)
            {
                ActiveProgram.Stop();

                //interfaceService.SwitchSolenoid(ActiveProgram.SolenoidId, false);
                //interfaceService.CreateEvent(EventTypes.IrrigationStop, string.Format("{0} aborted", ActiveProgram.Name));
                log.DebugFormat("Program {0} aborted", ActiveProgram.Name);
                //ActiveProgram.Finished = DateTime.Now;
                //interfaceService.UpdateIrrigationProgram(ActiveProgram);
                ActiveProgram = null;
                //ActiveSolenoid = null;
            }
        }
        public  void ReportStatus()
        {                 
            if (device.Mode == DeviceMode.Auto)
            {
                if (ActiveProgram != null)// && ActiveSolenoid != null)
                {
                    device.Status = string.Format("Irrigating '{0}' from schedule '{1}'. {2} minutes remaining."
                        , ActiveProgram.Solenoid.Name, ActiveProgram.Name, ActiveProgram.Remaining.Minutes);
                }
                else
                {
                    log.Debug("Debug1");
                    device.Status = "Standby. Waiting for next scheduled program to start.";
                }
            }

            if (device.Mode == DeviceMode.Manual)
            {
                if (ActiveProgram != null)// && ActiveSolenoid !=null)
                {
                    device.Status = string.Format("Irrigating '{0}' - {1} minutes remaining."
                        , ActiveProgram.Solenoid.Name, ActiveProgram.Remaining.Minutes);
                }
                else
                {
                    device.Status = "Standing by in manual mode.";
                }
            }

            try
            {
                DataService.Proxy.PutDevice(device);
            }
            catch (Exception ex)
            {
                log.ErrorFormat("ReportStatus(): {0}", ex.Message);
            }
        }
               
        public  void ActionCommand(Command cmd)
        {
            cmd.Actioned = DateTime.Now;
            DataService.Proxy.PutCommand(cmd);
        }
        public void Shutdown()
        {
            log.Info("DeviceController application shutdown");
            DataService.CreateEvent(EventTypes.Application, "DeviceController application shutdown",device.Id);
            bShutdown = true;
        }
        
    }
}
