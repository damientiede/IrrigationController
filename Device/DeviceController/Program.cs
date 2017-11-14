using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController
{
    class Program
    {
        static void Main(string[] args)
        {
            DeviceController d = new DeviceController("http://192.168.1.108:8000/api/");
            //DeviceController d = new DeviceController("http://192.168.178.125:8000/api/");
            d.Run();
        }
    }
}
