const Device = require('../models').Device;

module.exports = {
   seed() {
      Device
	    .count()
	    .then(d => { 
	        if (d ==0) {
              Device.create({
                    Name:'TestDevice1',
                    Description:'Seeded for testing',
                    State:'Standby',
                    Mode:'Manual',
                    Status:'Seeded',
                    PumpSolenoidId:0,
                    SoftwareVersion:'0.0.1',
                    DeviceMAC:'9CB70D839BC4'
	      });
          console.log('Created 1 device record');	   		
	   }
	})
   }
};
