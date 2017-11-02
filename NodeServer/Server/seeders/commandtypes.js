const CommandType = require('../models').CommandType;

module.exports = {
   seed() {
      CommandType
	.count()
	.then(c => { 
	   if (c ==0) {
	      CommandType.create({title:'Shutdown',description:'Quits the irrigation controller application'});
              CommandType.create({title:'Auto',description:'Changes to auto mode'});
              CommandType.create({title:'Manual',description:'Changes to manual mode'});
              CommandType.create({title:'Off',description:'Powers off all solenoids and stops all programs'});
              CommandType.create({title:'GetSchedules',description:'Instructs the controller to refresh the schedule cache'});
              CommandType.create({title:'LoadConfig',description:'Instructs the controller to reload its configuration'});
              console.log('Created 6 command types');	   		
	   }
	})
   }
};
