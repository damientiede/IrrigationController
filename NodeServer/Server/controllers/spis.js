const Spi = require('../models').Spi;

module.exports = {
   create(req, res) {      
        return Spi
            .create({            
                name: req.body.name,
                description: req.body.description,
                hardwareType: req.body.hardwaretype,            
                address: req.body.address,
                value:0
            })
            .then(spi => res.status(201).send(spi))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Spi
            .findById(req.params.id)
            .then(spi => res.status(200).send(spi))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Spi
            .findAll({ 
                where: { deviceid: parseInt(req.params.deviceid) }
	        })
            .then(spis => res.status(200).send(spis))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Spi
            .update({        
                deviceid: parseInt(req.body.deviceid),
                name: req.body.name,
                Clock: parseInt(req.body.Clock),            
                CS: parseInt(req.body.CS),            
                MISO: parseInt(req.body.MISO),            
                MOSI: parseInt(req.body.MOSI)           
            }, {
	            where: { id: req.body.id }
            })
            .then(spi => res.status(200).send(spi))
            .catch(error => res.status(400).send(error));
   },
};
