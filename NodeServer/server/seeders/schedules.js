const Schedule = require('../models').Schedule;

module.exports = {
    seed() {
        Schedule
	    .count()
	    .then(s => { 
	        if (s ==0) {
                Schedule.create({
                    name:'Evening Shelter',
                    description:'Run the shelter belts at night',
                    start: Date(),
                    duration:480,	
                    repeat:1,
                    interval:1,
                    enabled:1,
                    deviceId:1,
                    solenoidId:5	        
                    });

                console.log('Created 1 schedule record');	   		
	        }
	    })
    }
};
