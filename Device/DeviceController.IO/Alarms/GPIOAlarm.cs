using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Raspberry.IO.GeneralPurpose;
using DeviceController.Data;
using log4net;

namespace DeviceController.IO.Alarms
{
    public class GPIOAlarm : IAlarm
    {
        public int Id { get { return alarm.Id; } }
        public string Name { get { return alarm.Name; } }
        public string Description { get { return alarm.Description; } }
        public string Address { get { return alarm.Address; } }
        public Alarm alarm { get { return _alarm; } }        
        private Alarm _alarm;
        private DataServerWebClient dataServer;
        private GpioConnection gpio;
        private ConnectorPin pin;
        private PinConfiguration pinConfig;

        public bool State {
            get { return (alarm.Value == 1); }
            set
            {
                if (value != (alarm.Value == 1))
                {
                    if (value)
                    {
                        alarm.Value = 1;
                    }
                    else
                    {
                        alarm.Value = 0;
                    }
                }
            }
        }
        public GPIOAlarm(Alarm a, DataServerWebClient d)
        {
            _alarm = a;
            dataServer = d;
            switch (_alarm.Address)
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
                    throw new Exception(string.Format("Invalid GPIO pin configuration '{0}'", _alarm.Address));
            }
            pinConfig = pin.Input().Name(_alarm.Name);
            gpio.Add(pinConfig);
        }
        public string Report()
        {
            return string.Format("GPIOAlarm Id:{0} Name:{1} Address:{2} Description:{3} State:{4}", Id, Name, Description, Address, State);
        }
    }
}
