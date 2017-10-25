const Analog = require('../models').Analog;

module.exports = {
    seed() {
        Analog
	    .count()
	    .then(s => { 
	        if (s ==0) {
                Analog.create({
                    name:'Pump pressure',
                    description:'Pressure in the head works',
                    hardwareType:'Distributed',
                    address:'http://192.168.1.100/k2',	
                    multiplier: 1.23,
                    rawValue: 0.0,
                    units:'kPa',
                    deviceId:1,		        
                    value:0.0});

                console.log('Created 1 analog record');	   		
	        }
	    })
    }
};
