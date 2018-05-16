using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Data;
using log4net;

namespace DeviceController.IO.Solenoids
{
    public class DistributedSolenoid : ISolenoid
    {
        ILog log;
        public string Name { get; set; }
        public string Address { get; set; }
        public bool State { get; set; }
        
        public DistributedSolenoid(string name, string address)
        {
            log4net.Config.XmlConfigurator.Configure();
            log = LogManager.GetLogger("Device");
            Name = name;
            Address = address;
            
        }
        public void On()
        {
            if (!State)
            {
                //gpio.Toggle(pinConfig);
                State = true;
                log.DebugFormat("Solenoid: {0} On", Name);                
            }
        }
        public void Off()
        {
            if (State)
            {
                //gpio.Toggle(pinConfig);
                State = false;
                log.DebugFormat("Solenoid: {0} Off", Name);                
            }
        }
    }
}
