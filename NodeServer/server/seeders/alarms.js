const Alarm = require('../models').Alarm;

module.exports = {
    seed() {
        Alarm
	    .count()
	    .then(s => { 
	        if (s ==0) {
                Alarm.create({
                    name:'Station1',
                    description:'Test alarm 1',
                    hardwareType:'Distributed',
                    address:'http://192.168.1.100/k2',	
                    deviceId:1,		        
                    value:0});
                Alarm.create({
                    name:'Station2',
                    description:'Test alarm 2',
                    hardwareType:'GPIO',
                    address:'P1Pin28',	
                    deviceId:1,		        
                    value:0});
                Alarm.create({
                    name:'Station3',
                    description:'Test alarm 3',
                    hardwareType:'SPI',
                    address:'1',	
                    deviceId:1,		        
                    value:0});
                Alarm.create({
                    name:'Station4',
                    description:'Test alarm 4',
                    hardwareType:'GPIO',
                    address:'P1Pin21',
                    deviceId:1,			        
                    value:0});
                console.log('Created 4 alarms records');	   		
	        }
	    })
    }
};
