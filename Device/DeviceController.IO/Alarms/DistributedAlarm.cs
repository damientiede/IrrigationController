using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Data;

namespace DeviceController.IO.Alarms
{
    public class DistributedAlarm : IAlarm
    {
        public int Id { get { return alarm.Id; } }
        public string Name { get { return alarm.Name; } }
        public string Description { get { return alarm.Description; } }
        public string Address { get { return alarm.Address; } }
        public Alarm alarm { get { return _alarm; } }
        public event AlarmStatusChangedEventHandler StatusChanged;

        private Alarm _alarm;
        private DataServerWebClient dataServer;

        public bool State
        {
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
        public DistributedAlarm(Alarm a, DataServerWebClient d)
        {
            _alarm = a;
            dataServer = d;
        }
        public string Report()
        {
            return string.Format("DistributedAlarm Id:{0} Name:{1} Address:{2} Description:{3} State:{4}", Id, Name, Description, Address, State);
        }
    }
}
