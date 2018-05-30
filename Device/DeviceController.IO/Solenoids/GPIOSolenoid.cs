using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Raspberry.IO.GeneralPurpose;
using DeviceController.Data;
using log4net;

namespace DeviceController.IO.Solenoids
{
    public class GPIOSolenoid : ISolenoid
    {
        ILog log;
        //public int Id { get; }
        public string Name { get; }
        //public string Description { get; }
        public string Address { get; }
        public bool State { get; set; }
        //public bool RequiresPump { get; }

        private GpioConnection gpio;
        private ConnectorPin pin;
        private PinConfiguration pinConfig;

        //private Solenoid _solenoid;
        //private DataServerWebClient dataServer;
        //public Solenoid solenoid { get { return _solenoid; } }
                        
        public GPIOSolenoid(ConnectorPin p, string name, GpioConnection g)
        {
            log4net.Config.XmlConfigurator.Configure();
            log = LogManager.GetLogger("Device");
           
            gpio = g;
            pin = p;
            
            pinConfig = pin.Output().Name(name);
            gpio.Add(pinConfig);
        }
        public void On()
        {
            if (!State)
            {
                gpio.Toggle(pinConfig);
                State = true;
                log.DebugFormat("Solenoid: {0} On", Name);
                //dataServer.PutSolenoid(_solenoid);
            }            
        }
        public void Off()
        {
            if (State)
            {
                gpio.Toggle(pinConfig);
                State = false;
                log.DebugFormat("Solenoid: {0} Off", Name);
                //dataServer.PutSolenoid(_solenoid);
            }            
        }        
    }
}
