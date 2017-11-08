const Analog = require('../models').Analog;

module.exports = {
   create(req, res) {      
        return Analog
            .create({            
                name: req.body.Name,
                description: req.body.Description,
                hardwareType: req.body.HardwareType,            
                address: req.body.Address,
                multiplier: parseFloat(req.body.Multiplier),
                rawValue: 0,
                units: req.body.Units,
                deviceId: parseInt(req.body.DeviceId),
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
                name: req.body.Name,
                description: req.body.Description,
                hardwareType: req.body.Hardwaretype,            
                address: req.body.Address,
                multiplier: parseFloat(req.body.Multiplier),
                rawValue: parseInt(req.body.RawValue),
                units: req.body.Units,
                deviceId: parseInt(req.body.DeviceId),
                value:parseFloat(req.body.Value)
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
