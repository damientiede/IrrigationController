const User = require('../models').User;

module.exports = {
   seed() {
    User
	    .count()
	    .then(u => { 
	        if (u ==0) {
                User.create({
                    name:'Damien Tiede',
                    email:'damien@tiede.co.nz',
                    mobile:'0279201482',
                    address: '123 Test Street, Testville'
	            });
                console.log('Created 1 user record');	   		
	        }
	    })
   }
};
