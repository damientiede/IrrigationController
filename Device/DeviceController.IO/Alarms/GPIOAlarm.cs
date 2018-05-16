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
        
        public event AlarmStatusChangedEventHandler StatusChanged;

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
        public GPIOAlarm(Alarm a, DataServerWebClient d, GpioConnection g)
        {
            _alarm = a;
            dataServer = d;
            gpio = g;
            pin = IOFactory.GetGPIOPin(_alarm.Address);            

            pinConfig = pin.Input().Name(_alarm.Name).OnStatusChanged(b =>
            {
                _alarm.Value = b ? 1 : 0;
                Console.WriteLine("Alarm {0} {1}", _alarm.Name, b ? "on" : "off");
                AlarmStatusChangedEventArgs e = new AlarmStatusChangedEventArgs();
                e.Value = b;
                OnStatusChanged(e);
            });

            gpio.Add(pinConfig);                      
        }

        protected virtual void OnStatusChanged(AlarmStatusChangedEventArgs e)
        {
            //AlarmStatusChangedEventHandler handler = StatusChanged;
            if (StatusChanged != null)
            {
                StatusChanged(this, e);
            }
        }
        public string Report()
        {
            return string.Format("GPIOAlarm Id:{0} Name:{1} Address:{2} Description:{3} State:{4}", Id, Name, Address, Description, State);
        }
    }
}
