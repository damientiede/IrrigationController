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
        string Name { get; }           
        bool State { get; set; }             
        event AlarmStatusChangedEventHandler StatusChanged;        
    }
}
