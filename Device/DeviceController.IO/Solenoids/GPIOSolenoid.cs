using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Raspberry.IO.GeneralPurpose;

namespace DeviceController.IO.Solenoids
{
    public class GPIOSolenoid : ISolenoid
    {
        public int Id { get; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        private bool state;
        public bool State { get { return state; } }
        private GpioConnection connection;
                        
        public GPIOSolenoid(int id, string address)
        {
            Address = address;
            state = false;
            Id = id;
        }
        public void On()
        {
            state = true;
        }
        public void Off()
        {
            state = false;
        }
        public string Report()
        {
            return string.Format("GPIOSolenoid Id:{0} Name:{1} Description:{2} Address:{3} State:{4}",
                Id, Name, Description, Address, State);
        }
    }
}
