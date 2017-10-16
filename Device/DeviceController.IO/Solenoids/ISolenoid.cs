using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.IO.Solenoids
{
    public interface ISolenoid
    {
        int Id { get; }
        void On();
        void Off();
        bool State { get; }
        string Address { get; set; }
    }
}
