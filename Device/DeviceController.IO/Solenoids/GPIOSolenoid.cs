using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Raspberry.IO.GeneralPurpose;
using DeviceController.Data;

namespace DeviceController.IO.Solenoids
{
    public class GPIOSolenoid : ISolenoid
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
        public bool RequiresPump
        {
            get { return solenoid.RequiresPump; }
        }
        private GpioConnection connection;
        private Solenoid _solenoid;
        private DataServerWebClient dataServer;
        public Solenoid solenoid { get { return _solenoid; } }
                        
        public GPIOSolenoid(Solenoid s, DataServerWebClient d)
        {
            _solenoid = s;
            dataServer = d;
        }
        public void On()
        {
            if (!State)
            {
                State = true;
                dataServer.PutSolenoid(_solenoid);
            }            
        }
        public void Off()
        {
            if (State)
            {
                State = false;
                dataServer.PutSolenoid(_solenoid);
            }            
        }
        public string Report()
        {
            return string.Format("GPIOSolenoid Id:{0} Name:{1} Description:{2} Address:{3} State:{4}",
                Id, Name, Description, Address, State);
        }
    }
}
