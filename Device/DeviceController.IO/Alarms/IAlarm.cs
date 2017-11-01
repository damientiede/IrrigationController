using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Data;

namespace DeviceController.IO.Alarms
{
    public interface IAlarm
    {
        int Id { get; }
        string Name { get; }
        string Description { get; }       
        bool State { get; set; }
        string Address { get; }
        string Report();
        Alarm alarm { get; }
    }
}
