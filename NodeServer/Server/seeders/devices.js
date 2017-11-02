const Device = require('../models').Device;

module.exports = {
   seed() {
      Device
	    .count()
	    .then(d => { 
	        if (d ==0) {
              Device.create({
                    name:'TestDevice1',
                    description:'Seeded for testing',
                    state:'Standby',
                    mode:'Manual',
			        manualStart:null,
                    manualDuration:0,
                    manualSolenoid:0,
                    pumpSolenoid:0,
                    softwareVersion:'0.0.1',
                    deviceMAC:'TestSeed'
	      });
          console.log('Created 1 device record');	   		
	   }
	})
   }
};
