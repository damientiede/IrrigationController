using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.IO
{    
    public class SpiDevice
    {
        public int Id { get; }
        public string Name { get; set; }
        public int Clock { get; set; }
        public int CS { get; set; }
        public int MISO { get; set; }
        public int MOSI { get; set; }
        public SpiDevice(int id, string name, int clock, int cs, int miso, int mosi)
        {
            Id = id;
            Name = name;
            Clock = clock;
            CS = cs;
            MISO = miso;
            MOSI = mosi;
        }
        public string Report()
        {
            return string.Format("SpiDevice Id:{0} Name:{1} Clock:{2} CS:{3} MISO:{4} MOSI:{5}",
                Id, Name, Clock, CS, MISO, MOSI);
        }
    }    
}
