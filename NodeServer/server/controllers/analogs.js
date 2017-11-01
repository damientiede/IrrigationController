const Analog = require('../models').Analog;

module.exports = {
   create(req, res) {      
        return Analog
            .create({            
                name: req.body.name,
                description: req.body.description,
                hardwareType: req.body.hardwareType,            
                address: req.body.address,
                multiplier: parseFloat(req.body.multiplier),
                rawValue: 0,
                units: req.body.units,
                deviceId: parseInt(req.body.deviceId),
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
            .findAll()
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
                deviceId: parseInt(req.body.deviceId),
                value:parseFloat(req.body.value)
            }, {
	            where: { id: req.body.id }
            })
            .then(analog => res.status(200).send(analog))
            .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {    
        return Analog
        .findAll({
            where: {deviceId: req.params.deviceId}        
        })
        .then(analogs => res.status(200).send(analogs))
        .catch(error => res.status(400).send(error));  
        }
};
