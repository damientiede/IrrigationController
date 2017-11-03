using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class IrrigationProgram
    {
        public int Id;        
        public string Name;
        public DateTime Start;
        public int Duration;
        public int SolenoidId;
        public bool RequiresPump;
        //    public int MinsRemaining
        //    {
        //        get
        //        {
        //            if (Start != null && Duration != null)
        //            {
        //                DateTime dt = (DateTime)Start;
        //                int d = (Int32)Duration;                    
        //                return (DateTime.Now - dt.AddMinutes(d)).Minutes;
        //            }
        //            return 0;
        //        }
        //    }
        //    public bool Completed
        //    {
        //        get
        //        {
        //            if (Start != null && Duration != null)
        //            {
        //                DateTime dt = (DateTime)Start;
        //                int d = (Int32)Duration;
        //                return (dt.AddMinutes(d) < DateTime.Now);
        //            }
        //            return false;
        //        }
        //    }
        //    public IrrigationProgram()
        //    {

        //    }
        //    public IrrigationProgram(Command cmd)
        //    {
        //        string[] parts = cmd.Params.Split(',');
        //        SolenoidId = Int32.Parse(parts[0]);
        //        Duration = Int32.Parse(parts[1]);
        //        Start = DateTime.Now;
        //        Name = "Manual program";
        //    }
        //}
    }
