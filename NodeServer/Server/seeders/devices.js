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
                    status:'Seeded',
			        programStart:null,
                    programDuration:0,
                    programSolenoid:0,
                    pumpSolenoid:0,
                    softwareVersion:'0.0.1',
                    deviceMAC:'9CB70D839BC4'
	      });
          console.log('Created 1 device record');	   		
	   }
	})
   }
};
