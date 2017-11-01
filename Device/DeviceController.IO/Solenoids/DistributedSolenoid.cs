using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Data;

namespace DeviceController.IO.Solenoids
{
    public class DistributedSolenoid : ISolenoid
    {
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
        private Solenoid _solenoid;
        private DataServer dataServer;
        public Solenoid solenoid { get { return _solenoid; } }

        public DistributedSolenoid(Solenoid s, DataServer d)
        {
            _solenoid = s;
            dataServer = d;
        }
        public void On()
        {
            State = true;
        }
        public void Off()
        {
            State = false;
        }
        public string Report()
        {
            return string.Format("DistributedSolenoid Id:{0} Name:{1} Description:{2} Address:{3} State:{4}",
                Id, Name, Description, Address, State);
        }
    }
}
