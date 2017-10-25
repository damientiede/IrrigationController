﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class Event
    {
        public int Id;
        public int EventType;
        public string EventValue;
        public int DeviceId;
        public DateTime CreatedAt;
        public DateTime UpdatedAt;
    }
}
