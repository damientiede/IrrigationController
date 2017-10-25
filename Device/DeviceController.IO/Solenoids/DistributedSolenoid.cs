using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.IO.Solenoids
{    
    public class DistributedSolenoid : ISolenoid
    {        
        private string address;
        private bool state;        
        public int Id { get ; }
        public string Name { get; set; }
        public string Description { get; set; }
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
            return string.Format("DistributedSolenoid Id:{0} Name:{1} Description:{2} Address:{3} State:{4}", 
                Id, Name, Description, Address, State);
        }
    }       
}
