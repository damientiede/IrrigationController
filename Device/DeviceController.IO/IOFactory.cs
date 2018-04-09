using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.IO.Solenoids;
using DeviceController.IO.Alarms;
using DeviceController.IO.Analogs;
using DeviceController.Data;
using Raspberry.IO;
using Raspberry.IO.GeneralPurpose;

namespace DeviceController.IO
{
    public class IOFactory
    {
        private DataServerWebClient dataServer;
        private GpioConnection gpio;
        public IOFactory(DataServerWebClient d, GpioConnection g)
        {
            dataServer = d;
            gpio = g;
        }
        public ISolenoid CreateSolenoid(Solenoid s)
        {
            switch(s.HardwareType)
            {
                case "GPIO":
                    GPIOSolenoid sol = new GPIOSolenoid(s, dataServer, gpio);
                    return sol;                    
                case "Distributed":
                    return new DistributedSolenoid(s, dataServer);                    
                case "SPI":
                    return new SPISolenoid(s, dataServer);                  
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
