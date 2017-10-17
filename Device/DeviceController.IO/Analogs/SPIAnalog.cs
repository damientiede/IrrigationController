using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.IO.Analogs
{
    public class SPIAnalog : IAnalog
    {
        public int Id { get; }   
        public string Name { get; set; }
        public string Description { get; set; }     
        public double RawValue { get { return rawValue; } }
        public double Value { get; }
        public double Multiplier { get; set; }
        public string Address { get; set; }
        public string Units { get; set; }
        private double rawValue;
        private double value;
        public SPIAnalog(int id, string address)
        {
            Id = id;
            Address = address;
        }
        public double Sample()
        {
            Read();
            value = rawValue * Multiplier;
            return value;
        }
        protected void Read()
        {
            //read data from SPI channel
        }
    }
}
