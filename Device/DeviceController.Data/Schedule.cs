using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class Schedule
    {
        public int Id;
        public string Name;
        public int SolenoidId;
        public DateTime Start;
        public int Duration;
        public string Days;        
        public bool Repeat;
        public bool Enabled;
        public int DeviceId;
    }
}
