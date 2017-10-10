using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using DeviceController.Data;
using log4net;

namespace TestHarness
{
    public partial class Form1 : Form
    {
        ILog log;
        DataServer data;
        public Form1()
        {
            InitializeComponent();
            log = LogManager.GetLogger("Device");
            data = new DataServer(textBox2.Text);
            //log.Info("Testharness started");
        }

        private async void button1_Click(object sender, EventArgs e)
        {            
            List<Command> commands = await data.GetCommands(1);
            if (commands.Count() > 0)
            {
                textBox1.Text += string.Format("GetCommands() {0} commands retrieved \r\n", commands.Count());
                //log.DebugFormat("GetCommands() {0} commands retrieved", commands.Count());
            }
            foreach (Command command in commands)
            {
                textBox1.Text += string.Format("CommandId:{0} Params:{1} Issued:{2} DeviceId:{3} \r\n", command.Id, command.Params, command.Issued, command.DeviceId);                
            }
        }

        private async void button2_Click(object sender, EventArgs e)
        {            
            List<Solenoid> solenoids = await data.GetSolenoids(1);
            if (solenoids.Count() > 0)
            {
                textBox1.Text += string.Format("GetSolenoids() {0} solenoids retrieved \r\n", solenoids.Count());
                //log.DebugFormat("GetCommands() {0} commands retrieved", commands.Count());
            }
            foreach (Solenoid solenoid in solenoids)
            {
                textBox1.Text += string.Format("SolenoidId:{0} name:{1} Description:{2} HardwareType:{3} Address:{4} Value:{5} RequiresPump:{6} DeviceId:{7} \r\n", solenoid.Id, solenoid.Name, solenoid.Description, solenoid.HardwareType, solenoid.Address, solenoid.Value,solenoid.RequiresPump, solenoid.DeviceId);
            }
        }

        private async void button3_Click(object sender, EventArgs e)
        {            
            List<Alarm> alarms = await data.GetAlarms(1);
            if (alarms.Count() > 0)
            {
                textBox1.Text += string.Format("GetAlarms() {0} alarms retrieved \r\n", alarms.Count());
                //log.DebugFormat("GetCommands() {0} commands retrieved", commands.Count());
            }
            foreach (Alarm alarm in alarms)
            {
                textBox1.Text += string.Format("AlarmId:{0} name:{1} description:{2} hardwareType:{3} Address:{4} Value:{5} DeviceId:{6} \r\n", alarm.Id, alarm.Name, alarm.Description, alarm.HardwareType, alarm.Address, alarm.Value, alarm.DeviceId);               
            }
        }

        private async void button5_Click(object sender, EventArgs e)
        {
            var macAddr =
            (
                from nic in NetworkInterface.GetAllNetworkInterfaces()
                where nic.OperationalStatus == OperationalStatus.Up
                select nic.GetPhysicalAddress().ToString()
            ).FirstOrDefault();

            Device d = await data.Register(macAddr);
            textBox1.Text += string.Format("Register success. DeviceId:{0} \r\n", d.Id);
        }

        private async void button6_Click(object sender, EventArgs e)
        {
            List<Event> events = await data.GetEvents(1);
            if (events.Count() > 0)
            {
                textBox1.Text += string.Format("GetEvents() {0} events retrieved \r\n", events.Count());
                //log.DebugFormat("GetCommands() {0} commands retrieved", commands.Count());
            }
            foreach (Event ev in events)
            {
                textBox1.Text += string.Format("eventId:{0} eventtype:{1} eventValue:{2} createdAt:{3} \r\n", ev.Id, ev.EventType, ev.EventValue, ev.CreatedAt.ToString());
            }
        }
    }
}
