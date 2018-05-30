using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Data;
using Raspberry.IO;
using Raspberry.IO.GeneralPurpose;
using Raspberry.IO.Components.Converters.Mcp3008;
using UnitsNet;
using log4net;

namespace DeviceController.IO.Analogs
{
    public class SPIAnalog : IAnalog
    {
        ILog log;        
        public string Name { get; set; }
        public double RawValue { get; set; }
        public double Value { get; set; } 
        public double Multiplier { get; set; }
        public string Units { get; set; }
        public string Address { get; set; }       
        public double Threshold { get; set; }      
        public event AnalogValueChangedEventHandler ValueChanged;

        private IInputAnalogPin spiInput;
        private ElectricPotential sample = ElectricPotential.FromVolts(0);
        private ElectricPotential prevSample = ElectricPotential.FromVolts(0);
        private ElectricPotential referenceVoltage = ElectricPotential.FromVolts(3.3);
        

        public SPIAnalog(IInputAnalogPin pin, string name, double multiplier, string units)
        {
            log4net.Config.XmlConfigurator.Configure();
            log = LogManager.GetLogger("Device");            
            spiInput = pin;
            Name = name;
            Threshold = 100.0;
            Multiplier = multiplier;
            Units = units;
        }
        
        public double Sample()
        {
            //log.DebugFormat("SPIAnalog.Sample() rawValue:{0} mV prevSample:{0} mV",RawValue, prevSample.Millivolts);
            Read();

            RawValue = sample.Millivolts;
            Value = RawValue * Multiplier;

            //log.DebugFormat("SPIAnalog.Sample() rawValue:{0} mV prevSample:{0} mV", RawValue, prevSample.Millivolts);

            //check to see if new reading exceeds threshold
            double delta = Math.Abs(sample.Millivolts - prevSample.Millivolts);
            if (delta > Threshold)
            {
                AnalogValueChangedEventArgs e = new AnalogValueChangedEventArgs();
                e.Value = (decimal)Value;
                OnValueChanged(e);
            }
            
            return Value;
        }
        protected void Read()
        {
            //read data from SPI channel
            prevSample = sample;
            sample = referenceVoltage * (double)spiInput.Read().Relative;
        }
        protected virtual void OnValueChanged(AnalogValueChangedEventArgs e)
        {            
            if (ValueChanged != null)
            {
                ValueChanged(this, e);
            }
        }

        //int Pressure = Convert.ToInt32(v.Millivolts * Multiplier);
        //double diff = Math.Abs(v.Millivolts - volts.Millivolts);
        //if (diff > 250)
        //{
        //    volts = ElectricPotential.FromMillivolts(v.Millivolts);
        //    Console.WriteLine("Pressure: {0}", Pressure);
        //    //CreateEvent(EventType.IOEvent, string.Format("Pressure change {0}", Pressure));
        //    //bUpdateStatus = true;
        //}
        //if ((diff > 150) && !bUpdateStatus)
        //{
        //    volts = ElectricPotential.FromMillivolts(v.Millivolts);
        //    Console.WriteLine("Pressure: {0}", Pressure);
        //    CreateEvent(EventType.IOEvent, string.Format("Pressure change {0}", Pressure));
        //    bUpdateStatus = true;
        //}
    }

}
