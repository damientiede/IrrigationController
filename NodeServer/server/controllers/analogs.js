const Analog = require('../models').Analog;

module.exports = {
   create(req, res) {      
        return Analog
            .create({            
                name: req.body.name,
                description: req.body.description,
                hardwareType: req.body.hardwaretype,            
                address: req.body.address,
                multiplier: parseFloat(req.body.multiplier),
                rawValue: 0,
                units: req.body.units,
                deviceid: parseInt(req.body.deviceid),
                value:0
            })
            .then(analog => res.status(201).send(analog))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Analog
            .findById(req.params.id)
            .then(analog => res.status(200).send(analog))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Analog
            .findAll({ 
                where: { deviceid: parseInt(req.params.deviceid) }
	        })
            .then(analog => res.status(200).send(analog))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Analog
            .update({        
                name: req.body.name,
                description: req.body.description,
                hardwareType: req.body.hardwaretype,            
                address: req.body.address,
                multiplier: parseFloat(req.body.multiplier),
                rawValue: parseInt(req.body.rawValue),
                units: req.body.units,
                deviceid: parseInt(req.body.deviceid),
                value:parseFloat(req.body.value)
            }, {
	            where: { id: req.body.id }
            })
            .then(alarm => res.status(200).send(alarm))
            .catch(error => res.status(400).send(error));
   },
};
