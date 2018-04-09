using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using Raspberry.IO.GeneralPurpose;
using log4net;

namespace GPIOTestHarness
{
    class Program
    {
        
        static void Main(string[] args)
        {
            log4net.Config.XmlConfigurator.Configure();
            ILog log = LogManager.GetLogger("GPIO");
            log.Debug("Start");

            PinConfiguration output = ConnectorPin.P1Pin15.Output().Name("Output1");
            PinConfiguration[] outputs = new PinConfiguration[]
            {
                output
            };

            GpioConnection gpio = new GpioConnection(outputs);
            gpio.Open();

            bool bShutdown = false;
            while(!bShutdown)
            {

                gpio.Toggle(output);
                log.Debug("Toggle output");

                Thread.Sleep(5000);

            }
        }
    }
}
