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
        public int Id
        {
            get { return solenoid.Id; }
        }
        public string Name
        {
            get { return solenoid.Name; }
        }
        public string Description
        {
            get { return solenoid.Description; }
        }
        public string Address
        {
            get { return solenoid.Address; }
        }        
        public bool State
        {
            get { return (solenoid.Value == 1); }
            set
            {
                if (value)
                {
                    solenoid.Value = 1;
                }
                else
                {
                    solenoid.Value = 0;
                }
            }
        }
        public bool RequiresPump
        {
            get { return solenoid.RequiresPump; }
        }

        private GpioConnection gpio;
        private ConnectorPin pin;
        private PinConfiguration pinConfig;

        private Solenoid _solenoid;
        private DataServerWebClient dataServer;
        public Solenoid solenoid { get { return _solenoid; } }
                        
        public GPIOSolenoid(Solenoid s, DataServerWebClient d, GpioConnection g)
        {
            log4net.Config.XmlConfigurator.Configure();
            log = LogManager.GetLogger("Device");

            _solenoid = s;
            dataServer = d;
            gpio = g;
            
            switch (_solenoid.Address)
            {
                case "P1Pin03":
                    pin = ConnectorPin.P1Pin03;
                    break;
                case "P1Pin05":
                    pin = ConnectorPin.P1Pin05;
                    break;
                case "P1Pin07":
                    pin = ConnectorPin.P1Pin07;
                    break;
                case "P1Pin08":
                    pin = ConnectorPin.P1Pin08;
                    break;
                case "P1Pin10":
                    pin = ConnectorPin.P1Pin10;
                    break;
                case "P1Pin11":
                    pin = ConnectorPin.P1Pin11;
                    break;
                case "P1Pin12":
                    pin = ConnectorPin.P1Pin12;
                    break;
                case "P1Pin13":
                    pin = ConnectorPin.P1Pin13;
                    break;
                case "P1Pin15":
                    pin = ConnectorPin.P1Pin15;
                    break;
                case "P1Pin16":
                    pin = ConnectorPin.P1Pin16;
                    break;
                case "P1Pin18":
                    pin = ConnectorPin.P1Pin18;
                    break;
                case "P1Pin19":
                    pin = ConnectorPin.P1Pin19;
                    break;
                case "P1Pin21":
                    pin = ConnectorPin.P1Pin21;
                    break;
                case "P1Pin22":
                    pin = ConnectorPin.P1Pin22;
                    break;
                case "P1Pin23":
                    pin = ConnectorPin.P1Pin23;
                    break;
                case "P1Pin24":
                    pin = ConnectorPin.P1Pin24;
                    break;
                case "P1Pin26":
                    pin = ConnectorPin.P1Pin26;
                    break;
                case "P1Pin27":
                    pin = ConnectorPin.P1Pin27;
                    break;
                case "P1Pin28":
                    pin = ConnectorPin.P1Pin28;
                    break;
                case "P1Pin29":
                    pin = ConnectorPin.P1Pin29;
                    break;
                case "P1Pin3":
                    pin = ConnectorPin.P1Pin3;
                    break;
                case "P1Pin31":
                    pin = ConnectorPin.P1Pin31;
                    break;
                case "P1Pin32":
                    pin = ConnectorPin.P1Pin32;
                    break;
                case "P1Pin33":
                    pin = ConnectorPin.P1Pin33;
                    break;
                case "P1Pin35":
                    pin = ConnectorPin.P1Pin35;
                    break;
                case "P1Pin36":
                    pin = ConnectorPin.P1Pin36;
                    break;
                case "P1Pin37":
                    pin = ConnectorPin.P1Pin37;
                    break;
                case "P1Pin38":
                    pin = ConnectorPin.P1Pin38;
                    break;
                case "P1Pin40":
                    pin = ConnectorPin.P1Pin40;
                    break;
                case "P1Pin5":
                    pin = ConnectorPin.P1Pin5;
                    break;
                case "P1Pin7":
                    pin = ConnectorPin.P1Pin7;
                    break;
                case "P1Pin8":
                    pin = ConnectorPin.P1Pin8;
                    break;
                default:
                    throw new Exception(string.Format("Invalid GPIO pin configuration '{0}'", _solenoid.Address));
            }
            pinConfig = pin.Output().Name(_solenoid.Name);
            gpio.Add(pinConfig);
        }
        public void On()
        {
            if (!State)
            {
                gpio.Toggle(pinConfig);
                State = true;
                log.DebugFormat("Solenoid: {0} HardwareType: {1}", _solenoid.Name, _solenoid.HardwareType);
                dataServer.PutSolenoid(_solenoid);
            }            
        }
        public void Off()
        {
            if (State)
            {
                gpio.Toggle(pinConfig);
                State = false;
                log.DebugFormat("Solenoid: {0} HardwareType: {1}", _solenoid.Name, _solenoid.HardwareType);
                dataServer.PutSolenoid(_solenoid);
            }            
        }
        public string Report()
        {
            return string.Format("GPIOSolenoid Id:{0} Name:{1} Description:{2} Address:{3} State:{4}",
                Id, Name, Description, Address, State);
        }
    }
}
