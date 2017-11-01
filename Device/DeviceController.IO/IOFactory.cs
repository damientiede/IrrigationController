using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.IO.Solenoids;
using DeviceController.IO.Alarms;
using DeviceController.IO.Analogs;
using DeviceController.Data;

namespace DeviceController.IO
{
    public class IOFactory
    {
        private DataServer dataServer;
        public IOFactory(DataServer d)
        {
            dataServer = d;
        }
        public ISolenoid CreateSolenoid(Solenoid s)
        {
            switch(s.HardwareType)
            {
                case HardwareTypes.GPIO:
                    return new GPIOSolenoid(s, dataServer);                    
                case HardwareTypes.Distributed:
                    return new DistributedSolenoid(s, dataServer);                    
                case HardwareTypes.SPI:                    
                default:
                    break;
            }
            throw new Exception("Unknown Solenoid type");
        }
        public IAlarm CreateAlarm(Alarm a)
        {
            switch (a.HardwareType)
            {
                case HardwareTypes.GPIO:
                    return new GPIOAlarm(a, dataServer);
                case HardwareTypes.Distributed:
                    return new DistributedAlarm(a, dataServer);
                case HardwareTypes.SPI:
                    return new SPIAlarm(a, dataServer);
                default:
                    break;
            }
            throw new Exception("Unknown Alarm type");
        }
        public IAnalog CreateAnalog(Analog a)
        {
            return new SPIAnalog(a.Id, a.Address);
        }
    }
}
