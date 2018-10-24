using System;
using System.Timers;
using DeviceController.Data;
using log4net;

namespace DeviceController.Devices
{
    public class DeviceProgram
    {
        ILog log = LogManager.GetLogger("Device");
        IrrigationProgram program;
        DeviceSolenoid solenoid;
        Timer timer;
        public string Name
        {
            get { return program.Name; }
            set { program.Name = value; }
        }
        public DateTime Start
        {
            get { return program.Start; }
        }
        public DateTime Finished
        {
            get { return program.Finished;}
            set { program.Finished = value;}
        }
        public int Duration
        {
            get { return program.Duration; }
        }
        public DeviceSolenoid Solenoid
        {
            get { return solenoid; }
        }
        public int DeviceId
        {
            get { return program.DeviceId; }
        }
        public delegate void ProgramCompletedEventHandler(object sender, EventArgs e);
        public event ProgramCompletedEventHandler ProgramCompleted;

        public DeviceProgram(string name, DeviceSolenoid sol, int duration)
        {
            solenoid = sol;
            program = new IrrigationProgram()
            {
                Name = name,
                Start = DateTime.Now,
                Duration = duration,
                DeviceId = DeviceController.DeviceId,
                SolenoidId = solenoid.Id,
                SolenoidName = solenoid.Name
            };
            program.Id = DataService.Proxy.PostIrrigationProgram(program);
            solenoid.On();
            if (solenoid.RequiresPump)
            {
                DeviceController.Pump.On();
            }
            timer = new Timer(1000);
            timer.Elapsed += Timer_Elapsed;
            timer.Enabled = true;
        }

        private void Timer_Elapsed(object sender, ElapsedEventArgs e)
        {
            if (Completed)
            {
                Stop();                             
                if (ProgramCompleted != null)
                {
                    EventArgs ea = new EventArgs();                    
                    ProgramCompleted(this, ea);
                }                
            }
            else
            {
                timer.Interval = 1000;
            }            
        }

        public void Stop()
        {
            timer.Enabled = false;
            timer.Dispose();
            solenoid.Off();
            if (solenoid.RequiresPump)
            {
                DeviceController.Pump.Off();
            }
            program.Finished = DateTime.Now;
            DataService.Proxy.PostIrrigationProgram(program);
            DataService.CreateEvent(EventTypes.IrrigationStop, string.Format("{0} aborted", Name),program.DeviceId);
        }
        public bool Completed
        {
            get
            {
                return (program.Start.AddMinutes(program.Duration) < DateTime.Now);
            }
        }
        public TimeSpan Remaining
        {
            get
            {
                return (program.Start.AddMinutes(program.Duration) - DateTime.Now);
            }
        }
    }
}
