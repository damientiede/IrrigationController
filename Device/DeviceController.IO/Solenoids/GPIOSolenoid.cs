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
        private int _id;
        private string address;
        private bool state;
        private GpioConnection connection;
        public int Id { get { return _id; } }
        public string Address
        {
            get { return address; }
            set { address = value; }
        }
        public bool State
        {
            get { return state; }            
        }
        public GPIOSolenoid(int id, string addr)
        {
            address = addr;
            state = false;
            _id = id;
        }
        public void On()
        {
            state = true;
        }
        public void Off()
        {
            state = false;
        }
    }
}
