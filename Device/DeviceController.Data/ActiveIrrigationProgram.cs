using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class ActiveIrrigationProgram:IrrigationProgram
    {
        DataServer dataServer;
        public ActiveIrrigationProgram(string name, int duration, int solenoidId, int deviceId)
        {
            Name = name;        
            SolenoidId = solenoidId;            
            Duration = duration;
            Start = DateTime.Now;            
            DeviceId = deviceId;
        }
        //public ActiveIrrigationProgram(Command cmd)
        //{
        //    string[] parts = cmd.Params.Split(',');
        //    SolenoidId = Int32.Parse(parts[0]);
        //    Duration = Int32.Parse(parts[1]);
        //    Start = DateTime.Now;
        //    DeviceId = cmd.DeviceId;
        //    Name = "Manual program";                   
        //}
        public bool Completed
        {
            get
            {
                return (Start.AddMinutes(Duration) < DateTime.Now);              
            }
        }
        public int MinsRemaining
        {
            get
            {
                return (DateTime.Now - Start.AddMinutes(Duration)).Minutes;
            }
        }
    }
}
