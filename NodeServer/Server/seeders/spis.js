const Spi = require('../models').Spi;

module.exports = {
   seed() {
      Spi
	    .count()
	    .then(s => { 
	        if (s ==0) {
              Spi.create({
                    Name:'Test SPI 1',
                    Clock: 0,
                    CS:0,
                    MISO:18,
                    MOSI:20,
                    DeviceId:1
	      });
          console.log('Created 1 spi record');	   		
	   }
	})
   }
};
