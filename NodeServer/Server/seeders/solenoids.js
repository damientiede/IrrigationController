const Solenoid = require('../models').Solenoid;

module.exports = {
    seed() {
       Solenoid
	    .count()
	    .then(s => { 
	        if (s ==0) {
                Solenoid.create({
                    name:'Station1',
                    description:'Test solenoid 1',
                    hardwareType:'GPIO',
                    address:'P1Pin25',			        
                    value:0});
                Solenoid.create({
                    name:'Station2',
                    description:'Test solenoid 2',
                    hardwareType:'GPIO',
                    address:'P1Pin28',			        
                    value:0});
                Solenoid.create({
                    name:'Station3',
                    description:'Test solenoid 3',
                    hardwareType:'GPIO',
                    address:'P1Pin26',			        
                    value:0});
                Solenoid.create({
                    name:'Station4',
                    description:'Test solenoid 4',
                    hardwareType:'GPIO',
                    address:'P1Pin21',			        
                    value:0});
                console.log('Created 4 solenoid records');	   		
	        }
	    })
    }
};
