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
        public string Report()
        {
            return string.Format("SPIAlarm Id:{0} Name:{1} Description:{2} Address:{3} State:{4}", Id, Name, Description, Address, State);
        }
    }
}
