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
        string Name { get; set; }
        string Description { get; set; }
        void On();
        void Off();
        bool State { get; }
        string Address { get; set; }
        string Report();
    }
}
