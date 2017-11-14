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
                    start: new Date(2017,11,3,0),
                    duration:480,	
                    days:'1,2,3,4',
                    repeat:1,                    
                    enabled:1,
                    deviceId:1,
                    solenoidId:1        
                    });
                Schedule.create({
                    name:'Block 1',
                    description:'Irrigate block 1 for 3 hours',
                    start: new Date(2017,11,3,8,15),
                    duration:360,
                    days:'5,6,7',	
                    repeat:1,                    
                    enabled:1,
                    deviceId:1,
                    solenoidId:3        
                    });

                console.log('Created 2 schedules');	   		
	        }
	    })
    }
};
