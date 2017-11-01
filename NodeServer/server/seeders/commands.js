const Command = require('../models').Command;

module.exports = {
   seed() {
      Command
	.count()
	.then(c => { 
	   if (c ==0) {
	      Command.create(
              { commandType:3,
                params:'Shelter,360',
                issued: new Date()
               });
              console.log('Created 1 command');	   		
	   }
	})
   }
};
