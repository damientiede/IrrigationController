const Spi = require('../models').Spi;

module.exports = {
   seed() {
      Spi
	    .count()
	    .then(s => { 
	        if (s ==0) {
              Spi.create({
                    name:'Test SPI 1',
                    ADCClock: 0,
                    ADCCS:0,
                    MISO:18,
                    MOSI:20                    
	      });
          console.log('Created 1 spi record');	   		
	   }
	})
   }
};
