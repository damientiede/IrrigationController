using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public enum DeviceMode { Auto, Manual, Diagnostic }
    public enum DeviceState { Standby, Irrigating, Fault }
    public class Device
    {
        public int Id;
        public string Name;
        public string Description;
        public DeviceState State;
        public DeviceMode Mode;
        public string Status;
        public string SoftwareVersion;
        public DateTime? ProgramStart;
        public int? ProgramDuration;
        public int? ProgramSolenoid;
        public string DeviceMAC;
        public int PumpSolenoid;
        public DateTime CreatedAt;
        public DateTime UpdatedAt;       

        public Device()
        {           
        }
    }
}
