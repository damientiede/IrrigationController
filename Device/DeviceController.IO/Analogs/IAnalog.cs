using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.IO.Analogs
{
    public interface IAnalog
    {
        int Id { get; }  
        string Name { get; set; }
        string Description { get; set; }      
        double Sample();
        double RawValue { get; }
        double Value { get; }
        double Multiplier { get; set; }
        string Address { get; set; }
        string Units { get; set; }
        string Report();
    }
}
