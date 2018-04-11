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
using DeviceController.Data;
using System.Threading;
using System.Net.Http;
using System.Net.Http.Headers;
using Raspberry.IO;
using Raspberry.IO.GeneralPurpose;
using log4net;


namespace DeviceController
{    
    public class DeviceController
    {
        ILog log;
        bool bShutdown = false;
        private string dataServerUrl;
        private DataServerWebClient dataServer;
        
        //private int deviceId = -1;
        private string macAddress = String.Empty;
        private IOFactory ioFactory;

        List<ISolenoid> Solenoids;
        List<IAlarm> Alarms;
        List<IAnalog> Analogs;
        List<SpiDevice> Spis;
        List<Command> Commands;
        List<CommandType> CommandTypes;
        List<Schedule> Schedules;

        ISolenoid PumpSolenoid;       
        ActiveIrrigationProgram ActiveProgram;
        ISolenoid ActiveSolenoid;

        Device device;
        Schedule ActiveSchedule;

        GpioConnection gpio;

        public DeviceController(string url)
        {
            log4net.Config.XmlConfigurator.Configure();            
            log = LogManager.GetLogger("Device");
            dataServerUrl = url;

            log.DebugFormat("About to initialize GPIO");
            PinConfiguration[] outputs = new PinConfiguration[]
            {
                ConnectorPin.P1Pin15.Output().Name("Output1"),
                ConnectorPin.P1Pin37.Output().Name("Output2")
            };
            gpio = new GpioConnection(outputs);
            log.DebugFormat("Success");

            dataServer = new DataServerWebClient(url);
            ioFactory = new IOFactory(dataServer, gpio);

            Spis = new List<SpiDevice>();
            Solenoids = new List<ISolenoid>();
            Alarms = new List<IAlarm>();
            Analogs = new List<IAnalog>();
            Schedules = new List<Schedule>();
            CommandTypes = new List<CommandType>();         
            
            Init();            
        }
        #region Config
        protected  void Init()
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
                        device = dataServer.Register(macAddress);
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
                CreateEvent(EventTypes.Application, string.Format("DeviceController start, registered with deviceId:{0}", device.Id));

                LoadConfig();

                gpio.Open();
            }
            catch (Exception ex)
            {
                log.ErrorFormat("Initialization failure: {0}", ex.Message);
                throw ex;
            }
        }
        protected void LoadConfig()
        {
            try
            {
                //clear any existing pins
                gpio.Clear();

                //get device config            
                LoadSpis();
                LoadSolenoids();
                LoadAlarms();
                LoadAnalogs();
                LoadSchedules();
                CreateEvent(EventTypes.Application, "DeviceController configuration complete");
                log.InfoFormat("DeviceController.LoadConfig(): Configuration complete.");
            }
            catch (Exception ex)
            {
                log.ErrorFormat("LoadConfig(): {0}", ex.Message);
            }
        }
        protected  void LoadCommandTypes()
        {
            log.InfoFormat("LoadCommandTypes()");
            CommandTypes =  dataServer.GetCommandTypes();            
        }
        protected  void LoadSpis()
        {
            log.InfoFormat("LoadSpis()");
            Spis.Clear();          
            List<Spi> spis =  dataServer.GetSpis(device.Id);
            foreach (Spi s in spis)
            {
                SpiDevice spiDevice = new SpiDevice(s.Id, s.Name, s.Clock, s.CS, s.MISO, s.MOSI);
                log.DebugFormat("LoadSpis(): Id:{0} name:{1} Clock:{2} CS:{3} MISO:{4} MOSI:{5} \r\n", spiDevice.Id, spiDevice.Name, spiDevice.Clock, spiDevice.CS, spiDevice.MISO, spiDevice.MOSI);
                Spis.Add(spiDevice);
                log.Info(spiDevice.Report());
            }
        }
        protected  void LoadSolenoids()
        {
            log.InfoFormat("LoadSolenoids()");
            Solenoids.Clear();
            List<Solenoid> solenoids =  dataServer.GetSolenoids(device.Id);
            if (solenoids != null)
            {
                foreach (Solenoid s in solenoids)
                {
                    log.DebugFormat("{0}  {1} {2}",s.Id,s.Description, s.HardwareType.ToString());
                    ISolenoid sol = ioFactory.CreateSolenoid(s);
                    Solenoids.Add(sol);  
                    
                    if (s.Id == device.PumpSolenoid)
                    {
                        PumpSolenoid = sol;
                    }                  
                }
            }
            foreach (ISolenoid solenoid in Solenoids)
            {                
                log.Info(solenoid.Report());
            }
            log.DebugFormat("{0} Solenoids configured", Solenoids.Count());
        }
        protected  void LoadAlarms()
        {
            log.InfoFormat("LoadAlarms()");
            Alarms.Clear();
            List<Alarm> alarms =  dataServer.GetAlarms(device.Id);
            foreach (Alarm a in alarms)
            {
                IAlarm alarm = ioFactory.CreateAlarm(a);
                log.InfoFormat("Registering StatusChanged on {0}", alarm.Name);
                alarm.StatusChanged += Alarm_StatusChanged;                
                Alarms.Add(alarm);
                log.Info(alarm.Report());
            }            
            log.DebugFormat("{0} Alarms configured", Alarms.Count());
        }        

        private void Alarm_StatusChanged(object sender, AlarmStatusChangedEventArgs e)
        {
            IAlarm alarm = sender as IAlarm;
            string s = string.Format("Alarm '{0}' {1}", alarm.Name, e.Value ? "on" : "off");
            log.Debug(s);
            CreateEvent(EventTypes.IO, s);            
        }

        protected  void LoadAnalogs()
        {
            log.InfoFormat("LoadAnalogs()");
            Analogs.Clear();
            List<Analog> analogs =  dataServer.GetAnalogs(device.Id);
            foreach (Analog a in analogs)
            {
                Analogs.Add(ioFactory.CreateAnalog(a));
            }
            foreach (IAnalog analog in Analogs)
            {
                log.Info(analog.Report());
            }
            log.DebugFormat("{0} Analogs configured", Analogs.Count());
        }
        protected  void LoadSchedules()
        {
            log.InfoFormat("LoadSchedules()");
            Schedules.Clear();
            Schedules =  dataServer.GetSchedules(device.Id);
            log.DebugFormat("{0} Schedules configured", Schedules.Count());
        }
        protected string ReportConfig()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("---- Device Configuration ----");
            sb.AppendFormat("  DeviceController : Id:{0} ServerUrl:{1} MAC:{2}\r\n", device.Id, dataServerUrl, macAddress);
            sb.AppendLine("  SPIs");
            foreach (SpiDevice s in Spis)
            {
                sb.AppendFormat("    {0}\r\n", s.Report());
            }
            sb.AppendLine("  Solenoids");
            foreach (ISolenoid s in Solenoids)
            {
                sb.AppendFormat("    {0}\r\n", s.Report());
            }
            sb.AppendLine("  Alarms");
            foreach (IAlarm a in Alarms)
            {
                sb.AppendFormat("    {0}\r\n", a.Report());
            }
            sb.AppendLine("  Analogs");
            foreach (IAnalog a in Analogs)
            {
                sb.AppendFormat("    {0}\r\n", a.Report());
            }
            sb.AppendLine("-------------------------");
            return sb.ToString();
        }
        #endregion

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
                        //log.DebugFormat("bShutdown:{0}", bShutdown.ToString());
                        //poll alarm status

                        if (ActiveProgram != null)
                        {
                            device.State = DeviceState.Irrigating;

                            //check to see if program is finished
                            if (ActiveProgram.Completed)
                            {
                                //program finished
                                SwitchSolenoid(ActiveProgram.SolenoidId, false);
                                CreateEvent(EventTypes.IrrigationStop, string.Format("{0} completed", ActiveProgram.Name));
                                log.DebugFormat("Program {0} completed", ActiveProgram.Name);
                                ActiveProgram.Finished = DateTime.Now;
                                UpdateIrrigationProgram(ActiveProgram);                                
                                                                
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
                                foreach (Schedule s in Schedules)
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
                                                    CreateIrrigationProgram(s.Name, s.Duration, s.SolenoidId);

                                                    SwitchSolenoid(ActiveProgram.SolenoidId, true);
                                                    CreateEvent(EventTypes.IrrigationStart, string.Format("Repeating schedule '{0}' started", ActiveProgram.Name));
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

                        Thread.Sleep(5000);
                        //log.Debug("Waking up");
                        //bShutdown = true;
                    }
                    catch (Exception ex)
                    {
                        log.Error(ex.Message);
                    }
                }
            }

            gpio.Close();
            log.InfoFormat("Device controller shutdown.");
        }
        public  void CreateEvent(EventTypes eventType, string desc)
        {            
            try
            {                
                Event e = new Event { EventType = (int)eventType, CreatedAt = DateTime.Now, EventValue = desc, DeviceId=device.Id };               
                dataServer.PostEvent(e);                
            }
            catch (Exception ex)
            {
                log.ErrorFormat("CreateEvent(): {0}", ex.Message);
            }
        }
        public  void CreateIrrigationProgram(string name, int duration, int solenoidId)
        {
            ActiveProgram = new ActiveIrrigationProgram(name,duration,solenoidId,device.Id);
            try
            {
                ActiveProgram.Id =  dataServer.PostIrrigationProgram(ActiveProgram);                
            }
            catch (Exception ex)
            {
                log.ErrorFormat("CreateIrrigationProgram(): {0}", ex.Message);
            }            
        }
        public  void UpdateIrrigationProgram(IrrigationProgram p)
        {
            try
            {
                 dataServer.PutIrrigationProgram(p);
            }
            catch (Exception ex)
            {
                log.ErrorFormat("UpdateIrrigationProgram(): {0}", ex.Message);
            }
        }
        public  void ProcessCommands()
        {
            //log.Debug("ProcessCommands()");
            //get commands
            try
            {
                List<Command> commands =  dataServer.GetCommands(device.Id);
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
                                CreateEvent(EventTypes.Application, "Switching to Auto mode");
                                device.Mode = DeviceMode.Auto;
                            }
                            ActionCommand(cmd);
                            break;

                        //Switch to Manual
                        case "Manual":
                            try
                            {
                                log.Info("Switching to Manual mode");
                                CreateEvent(EventTypes.Application, "Switching to Manual mode");
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
                                    CreateIrrigationProgram("Manual program",duration,solenoidId);                                    
                                                                                              
                                    device.State = DeviceState.Irrigating;
                                    device.Status = string.Format("Irrigating Solenoid {0} for {1} minutes", ActiveProgram.SolenoidId, ActiveProgram.Duration);
                                    log.Info(device.Status);

                                    //switch on solenoid for manual program
                                    SwitchSolenoid(ActiveProgram.SolenoidId, true);

                                    CreateEvent(EventTypes.IrrigationStart,
                                        string.Format("Manual irrigation program: {0} for {1} minutes", ActiveProgram.SolenoidId, ActiveProgram.Duration));
                                }
                            }
                            catch (Exception ex)
                            {
                                log.ErrorFormat("Manual command failed, invalid parameters");
                                CreateEvent(EventTypes.Fault, "Manual command failed, invalid parameters");
                                device.Mode = DeviceMode.Manual;
                                device.State = DeviceState.Standby;                                
                            }
                            ActionCommand(cmd);
                            break;

                        //Off - turn off all solenoids
                        case "Stop":
                        case "Off":
                            SolenoidsOff();
                            device.State = DeviceState.Standby;
                            device.Mode = DeviceMode.Manual;

                            CreateEvent(EventTypes.Application, "Switching all solenoids off");
                            AbortProgram();

                            ActionCommand(cmd);
                            break;
                        
                        //Get schedules
                        case "GetSchedules":
                            log.Info("GetSchedules");
                            LoadSchedules();
                            ActionCommand(cmd);
                            break;

                        //load configuration
                        case "LoadConfig":
                            log.Info("LoadConfig");
                            LoadConfig();
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
                SwitchSolenoid(ActiveProgram.SolenoidId, false);
                CreateEvent(EventTypes.IrrigationStop, string.Format("{0} aborted", ActiveProgram.Name));
                log.DebugFormat("Program {0} aborted", ActiveProgram.Name);
                ActiveProgram.Finished = DateTime.Now;
                UpdateIrrigationProgram(ActiveProgram);
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
                    device.Status = string.Format("Irrigating '{0}' from manual program. {1} minutes remaining."
                        , ActiveSolenoid.Name, ActiveProgram.MinsRemaining);
                }
                else
                {
                    device.Status = "Standing by in manual mode.";
                }
            }

            try
            {
                 dataServer.PutDevice(device);
            }
            catch (Exception ex)
            {
                log.ErrorFormat("ReportStatus(): {0}", ex.Message);
            }
        }
        public  void SwitchSolenoid(int solenoidId, bool value)
        {           
            foreach (ISolenoid s in Solenoids)
            {
                if (s.Id == solenoidId)
                {
                    if (value)
                    {
                        s.On();
                        ActiveSolenoid = s;
                        if (s.RequiresPump)
                        {
                            if (PumpSolenoid != null) { PumpSolenoid.On(); }
                        }                    
                    }
                    else
                    {
                        s.Off();
                    }
                }
                else
                {
                    s.Off();
                }
            }                     
        }        
        public  void ActionCommand(Command cmd)
        {
            cmd.Actioned = DateTime.Now;
             dataServer.PutCommand(cmd);
        }
        public  void Shutdown()
        {
            log.Info("DeviceController application shutdown");
            CreateEvent(EventTypes.Application, "DeviceController application shutdown");
            bShutdown = true;
        }
        public void SolenoidsOff()
        {
            log.Debug("SolenoidsOff()");
            foreach (ISolenoid s in Solenoids)
            {
                s.Off();
            }
        }
    }
}
