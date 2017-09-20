const Account = require('../models').Account;

module.exports = {
   seed() {
    Account
	    .count()
	    .then(a => { 
	        if (a ==0) {
                Account.create({
                    name:'Test account 1',
                    address: '123 Test Street, Testville'
	            });
                console.log('Created 1 device record');	   		
	        }
	    })
   }
};
