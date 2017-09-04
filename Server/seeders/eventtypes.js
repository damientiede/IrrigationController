const EventType = require('../models').EventType;

module.exports = {
   seed() {
      EventType
	.count()
	.then(c => { 
	   if (c ==0) {
	      EventType.create({name:'Application',});
              EventType.create({name:'Fault'});
              EventType.create({name:'IO'});
              EventType.create({name:'Irrigation start',description:'Irrigation start event'});
              EventType.create({name:'Irrigation stop',description:'Irrigation stop event'});
              console.log('Created 5 event types');	   		
	   }
	})
   }
};
