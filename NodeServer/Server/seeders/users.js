const User = require('../models').User;

module.exports = {
   seed() {
    User
	    .count()
	    .then(u => { 
	        if (u ==0) {
                User.create({
                    Name:'Damien Tiede',
                    Email:'damien@tiede.co.nz',
                    Mobile:'0279201482',
                    Address: '123 Test Street, Testville'
	            });
                console.log('Created 1 user record');	   		
	        }
	    })
   }
};
