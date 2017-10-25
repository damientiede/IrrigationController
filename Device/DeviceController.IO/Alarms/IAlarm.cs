using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.IO.Alarms
{
    public interface IAlarm
    {
        int Id { get; }
        string Name { get; set; }
        string Description { get; set; }       
        bool State { get; }
        string Address { get; set; }
        string Report();
    }
}
