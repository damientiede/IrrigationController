using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.IO.Solenoids
{    
    public class DistributedSolenoid : ISolenoid
    {
        private int _id;
        private string address;
        private bool state;        
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
        public DistributedSolenoid(int id, string addr)
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
