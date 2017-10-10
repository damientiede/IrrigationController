using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class Device
    {
        public int Id;
        public string Name;
        public string Description;        
        public enum State { Monitor, WaitForTimeout, ConfirmReset, WaitForReset }
        public enum Mode { Auto, Manual, Standby }
        public string SoftWareVersion;
        public DateTime? manualStart;
        public string deviceMAC;

        public int? manualDuration;
        public Solenoid manualSolenoid;
        public Solenoid pumpSolenoid;
        public DateTime CreatedAt;
        public DateTime UpdatedAt;

        //List<Solenoid> Solenoids;
        //List<Alarm> Alarms;
        //List<Analog> Analogs;
        //List<Spi> Spis;
        //List<Command> Commands;
        //List<Schedule> Schedules;

        public Device()
        {
            //List<Solenoid> Solenoids = new List<Solenoid>();
            //List<Alarm> Alarms = new List<Alarm>();
            //List<Analog> Analogs = new List<Analog>();
            //List<Spi> Spis = new List<Spi>();
            //List<Command> Commands = new List<Command>();
            //List<Schedule> Schedules = new List<Schedule>();
        }
    }
}
