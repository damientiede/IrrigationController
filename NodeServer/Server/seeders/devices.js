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
                    mode:'Off',
                    state:'Monitoring',			        
			        station:0,
			        start:null,
                    duration:0,
                    solenoid:'',
			        softwareVersion:'0.0.1',
	      });
          console.log('Created 1 device record');	   		
	   }
	})
   }
};
