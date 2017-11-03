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
using log4net;


namespace DeviceController
{    
    public class DeviceController
    {
        ILog log;
        bool bShutdown = false;
        private string dataServerUrl;
        private DataServer dataServer;
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

        Solenoid PumpSolenoid;
        //Solenoid ManualSolednoid;
        IrrigationProgram ActiveProgram;
        ISolenoid ActiveSolenoid;

        Device device;
        Schedule ActiveSchedule;

        //enum State { Irrigating = 0, Standby, Off, Fault }
        //State state;
        //enum Mode { Auto = 0, Manual, Off }
        //Mode mode;

        public DeviceController(string url)
        {
            log4net.Config.XmlConfigurator.Configure();            
            log = LogManager.GetLogger("Device");
            //dataServerUrl = url;

            dataServer = new DataServer(url);
            ioFactory = new IOFactory(dataServer);

            Spis = new List<SpiDevice>();
            Solenoids = new List<ISolenoid>();
            Alarms = new List<IAlarm>();
            Analogs = new List<IAnalog>();
            Schedules = new List<Schedule>();
            CommandTypes = new List<CommandType>();

            Init();            
        }
        #region Config
        protected async void Init()
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
                    log.DebugFormat("Registering device {0} with server...",macAddress);
                    device = await dataServer.Register(macAddress);
                    if (device == null)
                    {
                        Thread.Sleep(5000);
                    }
                }
                catch (Exception ex)
                {
                    log.Error(ex.Message);
                }                
            }

            dataServer.DeviceId = device.Id;
            log.DebugFormat("DeviceController start, registered with deviceId:{0}", device.Id);
            CreateEvent(EventTypes.Application, string.Format("DeviceController start, registered with deviceId:{0}",device.Id));

            LoadConfig();
        }
        protected async void Register()
        {
            try
            {                
                device = await dataServer.Register(macAddress);                
            }
            catch (Exception ex)
            {
                log.Error(ex.Message);
            }
        }
        protected void LoadConfig()
        {
            //get device config            
            LoadSpis();
            LoadSolenoids();
            LoadAlarms();
            LoadAnalogs();
            LoadSchedules();
            CreateEvent(EventTypes.Application, "DeviceController configuration complete");
            log.InfoFormat("DeviceController.LoadConfig(): Configuration complete.");
        }
        protected async void LoadCommandTypes()
        {
            log.InfoFormat("LoadCommandTypes()");
            CommandTypes = await dataServer.GetCommandTypes();            
        }
        protected async void LoadSpis()
        {
            log.InfoFormat("LoadSpis()");
            Spis.Clear();          
            List<Spi> spis = await dataServer.GetSpis(device.Id);
            foreach (Spi s in spis)
            {
                SpiDevice spiDevice = new SpiDevice(s.Id, s.Name, s.Clock, s.CS, s.MISO, s.MOSI);
                log.DebugFormat("LoadSpis(): Id:{0} name:{1} Clock:{2} CS:{3} MISO:{4} MOSI:{5} \r\n", spiDevice.Id, spiDevice.Name, spiDevice.Clock, spiDevice.CS, spiDevice.MISO, spiDevice.MOSI);
                Spis.Add(spiDevice);
                log.Info(spiDevice.Report());
            }
        }
        protected async void LoadSolenoids()
        {
            log.InfoFormat("LoadSolenoids()");
            Solenoids.Clear();
            List<Solenoid> solenoids = await dataServer.GetSolenoids(device.Id);
            if (solenoids != null)
            {
                foreach (Solenoid s in solenoids)
                {
                    Solenoids.Add(ioFactory.CreateSolenoid(s));
                }
            }
            foreach (ISolenoid solenoid in Solenoids)
            {
                log.Info(solenoid.Report());
            }
            log.DebugFormat("{0} Solenoids configured", Solenoids.Count());
        }
        protected async void LoadAlarms()
        {
            log.InfoFormat("LoadAlarms()");
            Alarms.Clear();
            List<Alarm> alarms = await dataServer.GetAlarms(device.Id);
            foreach (Alarm a in alarms)
            {
                Alarms.Add(ioFactory.CreateAlarm(a));               
            }
            foreach (IAlarm alarm in Alarms)
            {
                log.Info(alarm.Report());
            }
            log.DebugFormat("{0} Alarms configured",Alarms.Count());
        }
        protected async void LoadAnalogs()
        {
            log.InfoFormat("LoadAnalogs()");
            Analogs.Clear();
            List<Analog> analogs = await dataServer.GetAnalogs(device.Id);
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
        protected void LoadSchedules()
        {
            log.InfoFormat("LoadSchedules() todo");
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

                        //poll alarm status

                        if (ActiveProgram != null)
                        {
                            device.State = DeviceState.Irrigating;

                            //check to see if program is finished
                            if (ActiveProgram.Completed)
                            {
                                //schedule finished
                                SwitchSolenoid(ActiveProgram.SolenoidId, false);
                                CreateEvent(EventTypes.IrrigationStop, string.Format("{0} completed", ActiveProgram.Name));
                                log.DebugFormat("Active program completed");
                                ActiveSchedule = null;
                                ActiveProgram = null;
                                ActiveSolenoid = null;

                                device.ProgramDuration = null;
                                device.ProgramSolenoid = null;
                                device.ProgramStart = null;
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
                                //check for next active schedule
                                foreach (Schedule s in Schedules)
                                {
                                    if ((s.Start < DateTime.Now) && (s.Enabled))
                                    {
                                        //new active schedule
                                        ActiveSchedule = s;

                                        ActiveProgram = new IrrigationProgram();
                                        ActiveProgram.Duration = s.Duration;
                                        ActiveProgram.SolenoidId = s.SolenoidId;
                                        ActiveProgram.Start = s.Start;
                                        ActiveProgram.Name = ActiveSchedule.Name;

                                        device.ProgramDuration = ActiveProgram.Duration;
                                        device.ProgramSolenoid = ActiveProgram.SolenoidId;
                                        device.ProgramStart = ActiveProgram.Start;

                                        SwitchSolenoid(ActiveProgram.SolenoidId, true);
                                        CreateEvent(EventTypes.IrrigationStart, string.Format("{0} started", ActiveProgram.Name));
                                        device.State = DeviceState.Irrigating;
                                        break;
                                    }
                                }
                            }
                        }                       

                        //update the server
                        ReportStatus();                        

                        Thread.Sleep(5000);
                        //bShutdown = true;
                    }
                    catch (Exception ex)
                    {
                        log.Error(ex.Message);
                    }
                }
            }
        }
        public async void CreateEvent(EventTypes eventType, string desc)
        {            
            try
            {
                Event e = new Event { EventType = (int)eventType, CreatedAt = DateTime.Now, EventValue = desc, DeviceId=device.Id };
                await dataServer.PostEvent(e);
            }
            catch (Exception ex)
            {
                log.ErrorFormat("CreateEvent(): {0}", ex.Message);
            }
        }
        public async void ProcessCommands()
        {
            //get commands
            try
            {
                List<Command> commands = await dataServer.GetCommands(device.Id);
                foreach (Command cmd in commands)
                {
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
                                ActiveProgram = new IrrigationProgram(cmd);
                                log.Info("Switching to Manual mode");
                                CreateEvent(EventTypes.Application, "Switching to Manual mode");

                                device.Mode = DeviceMode.Manual;
                                device.State = DeviceState.Irrigating;

                                device.ProgramStart = ActiveProgram.Start;
                                device.ProgramDuration = ActiveProgram.Duration;
                                device.ProgramSolenoid = ActiveProgram.SolenoidId;
                                device.Status = string.Format("Irrigating Solenoid {0} for {1} minutes", ActiveProgram.SolenoidId, ActiveProgram.Duration);

                                //switch on solenoid for manual program
                                SwitchSolenoid(ActiveProgram.SolenoidId, true);

                                CreateEvent(EventTypes.IrrigationStart,
                                    string.Format("Manual irrigation program: {0} for {1} minutes", ActiveProgram.SolenoidId, ActiveProgram.Duration));
                            }
                            catch (Exception ex)
                            {
                                log.ErrorFormat("Manual command failed, invalid parameters");
                                CreateEvent(EventTypes.Fault, "Manual command failed, invalid parameters");
                                device.Mode = DeviceMode.Manual;
                                device.State = DeviceState.Standby;
                                device.ProgramStart = null;
                                device.ProgramSolenoid = null;
                                device.ProgramDuration = null;
                            }
                            ActionCommand(cmd);
                            break;

                        //Off - turn off all solenoids
                        case "Off":
                            SolenoidsOff();
                            device.State = DeviceState.Standby;
                            device.Mode = DeviceMode.Manual;

                            CreateEvent(EventTypes.Application, "Switching all solenoids off");
                            if (ActiveProgram != null)
                            {
                                if (!ActiveProgram.Completed)
                                {
                                    log.InfoFormat("Aborting manual irrigation program");
                                    ActiveProgram = null;
                                    CreateEvent(EventTypes.IrrigationStop, "Aborting manual irrigation program");
                                }
                            }

                            ActionCommand(cmd);
                            break;
                        
                        //Get schedules
                        case "GetSchedules":
                            log.Info("GetSchedules");
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
        public async void ReportStatus()
        {                 
            if (device.Mode == DeviceMode.Auto)
            {
                if (ActiveSchedule != null && ActiveProgram != null && ActiveSolenoid != null)
                {
                    device.Status = string.Format("Irrigating '{0}' from schedule '{1}'. {2} minutes remaining."
                        ,ActiveSolenoid.Name, ActiveSchedule.Name, ActiveProgram.MinsRemaining);
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
                await dataServer.PutDevice(device);
            }
            catch (Exception ex)
            {
                log.ErrorFormat("ReportStatus(): {0}", ex.Message);
            }
        }
        public async void SwitchSolenoid(int solenoidId, bool value)
        {           
            foreach (ISolenoid s in Solenoids)
            {
                if (s.Id == solenoidId)
                {
                    if (value)
                    {
                        s.On();
                        ActiveSolenoid = s;
                        device.ProgramSolenoid = solenoidId;
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
        public async void ActionCommand(Command cmd)
        {
            cmd.Actioned = DateTime.Now;
            await dataServer.PutCommand(cmd);
        }
        public async void Shutdown()
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
