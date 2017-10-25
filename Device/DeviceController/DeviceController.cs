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
        private int deviceId = -1;
        private string macAddress = String.Empty;
        List<ISolenoid> Solenoids;
        List<IAlarm> Alarms;
        List<IAnalog> Analogs;
        List<SpiDevice> Spis;
        List<Command> Commands;
        List<Schedule> Schedules;
        enum State { Monitor = 0, WaitForTimeout, ConfirmReset, WaitForReset }
        State state;
        enum Mode { Auto = 0, Manual, Off }
        Mode mode;
        public DeviceController(string url)
        {
            log4net.Config.XmlConfigurator.Configure();            
            log = LogManager.GetLogger("Device");
            dataServerUrl = url;

            Spis = new List<SpiDevice>();
            Solenoids = new List<ISolenoid>();
            Alarms = new List<IAlarm>();
            Analogs = new List<IAnalog>();
            Schedules = new List<Schedule>();

            Init();            
        }
        #region Config
        protected  void Init()
        {
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

            dataServer = new DataServer(dataServerUrl);

            //register with server
            while (deviceId < 0)
            {
                Register();
                if (deviceId < 0)
                {
                    Thread.Sleep(5000);
                }
            }
            CreateEvent(1, "DeviceController start");
            //get device config
            LoadSpis();
            LoadSolenoids();
            LoadAlarms();
            LoadAnalogs();
            LoadSchedules();
            
            CreateEvent(1, "DeviceController initialization complete");
            log.InfoFormat("DeviceController.Init(): Initialization complete.");
        }
        protected async void Register()
        {
            try
            {                
                Device d = await dataServer.Register(macAddress);
                deviceId = d.Id;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message);
            }
        }
        protected async void LoadSpis()
        {
            log.InfoFormat("LoadSpis()");            
            List<Spi> spis = await dataServer.GetSpis(deviceId);
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
            List<Solenoid> solenoids = await dataServer.GetSolenoids(deviceId);
            foreach (Solenoid s in solenoids)
            {
                switch (s.HardwareType)
                {
                    case HardwareTypes.GPIO:
                        Solenoids.Add(new GPIOSolenoid(s.Id, s.Address));
                        break;
                    case HardwareTypes.Distributed:
                        Solenoids.Add(new DistributedSolenoid(s.Id, s.Address));
                        break;
                    case HardwareTypes.SPI:
                        //Solenoids.Add(new SPISolenoid(s.Id, s.Address));
                        break;
                    default:
                        break;
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
            List<Alarm> alarms = await dataServer.GetAlarms(deviceId);
            foreach (Alarm a in alarms)
            {
                switch (a.HardwareType)
                {
                    case HardwareTypes.GPIO:
                        Alarms.Add(new GPIOAlarm(a.Id, a.Address));
                        break;
                    case HardwareTypes.Distributed:
                        Alarms.Add(new DistributedAlarm(a.Id, a.Address));
                        break;
                    case HardwareTypes.SPI:
                        Alarms.Add(new SPIAlarm(a.Id, a.Address));
                        break;
                    default:
                        break;
                }
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
            List<Analog> analogs = await dataServer.GetAnalogs(deviceId);
            foreach (Analog a in analogs)
            {
                switch (a.HardwareType)
                {
                    case HardwareTypes.GPIO:
                        //Analogs.Add(new GPIOAnalog(a.Id, a.Address));
                        break;
                    case HardwareTypes.Distributed:
                        //Analogs.Add(new DistributedAlarm(a.Id, a.Address));
                        break;
                    case HardwareTypes.SPI:
                        Analogs.Add(new SPIAnalog(a.Id, a.Address));
                        break;
                    default:
                        break;
                }
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
            sb.AppendFormat("  DeviceController : Id:{0} ServerUrl:{1} MAC:{2}\r\n", deviceId, dataServerUrl, macAddress);
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
                try
                {
                    //get commands
                    ProcessCommands();

                    //poll alarm status
                    
                    if (mode == Mode.Auto)
                    {
                        //process Schedules
                    }
                    else
                    {
                        //process manual station
                    }

                    Thread.Sleep(5000);
                    //bShutdown = true;
                }
                catch (Exception ex)
                {
                    log.Error(ex.Message);
                }                
            }
        }
        public async void CreateEvent(int eventType, string desc)
        {            
            try
            {
                Event e = new Event { EventType = eventType, CreatedAt = DateTime.Now, EventValue = desc, DeviceId=deviceId };
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
                Commands = await dataServer.GetCommands(deviceId);

            }
            catch (Exception ex)
            {
                log.ErrorFormat("GetCommands(): {0}", ex.Message);
            }

        }
    }
}
