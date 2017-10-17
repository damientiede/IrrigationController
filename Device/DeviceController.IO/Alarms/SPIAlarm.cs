using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.IO.Alarms
{
    public class SPIAlarm:IAlarm
    {
        public int Id { get; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        private bool state;
        public bool State { get { return state; } }
        public SPIAlarm(int id, string address)
        {
            Id = id;
            Address = address;
            state = false;
        }
    }
}
