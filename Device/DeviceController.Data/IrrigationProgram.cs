using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class IrrigationProgram
    {
        public int SolenoidId;
        public DateTime Start;
        public int Duration;
        public bool Completed
        {
            get
            {
                return (Start.AddMinutes(Duration) < DateTime.Now);
            }
        }
        public IrrigationProgram(Command cmd)
        {
            string[] parts = cmd.Params.Split(',');
            SolenoidId = Int32.Parse(parts[0]);
            Duration = Int32.Parse(parts[1]);
            Start = DateTime.Now;
        }
    }
}
