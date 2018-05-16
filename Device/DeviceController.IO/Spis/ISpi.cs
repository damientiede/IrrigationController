using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Data;
using Raspberry.IO;
using Raspberry.IO.GeneralPurpose;
using Raspberry.IO.Components.Converters.Mcp3008;

namespace DeviceController.IO.Spis
{
    public interface ISpi
    {
        int Id { get; }
        string Name { get; }            
        string Report();
        //Mcp3008InputAnalogPin GetChannel(Mcp3008Channel ch);        
    }
}
