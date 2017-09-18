const Status = require('../models').Status;

module.exports = {
   seed() {
      Status
	.count()
	.then(c => { 
	   if (c ==0) {
              Status.create({state:'Init',
			     mode:'Off',
			     pressure:0,
			     station:0,
			     start:new Date(),
                             duration:0,
			     scheduleId:0,
			     inputs:'',
    			     outputs:''
	      });
              console.log('Created 1 status record');	   		
	   }
	})
   }
};
