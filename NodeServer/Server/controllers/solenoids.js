const Solenoid = require('../models').Solenoid;

module.exports = {
   create(req, res) {      
        return Solenoid
            .create({            
                name: req.body.name,
                description: req.body.description,
                hardwareType: req.body.hardwaretype,            
                address: req.body.address,
                value:0,
                deviceId: req.body.deviceId
            })
            .then(solenoid => res.status(201).send(solenoid))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Solenoid
            .findById(req.params.id)
            .then(solenoid => res.status(200).send(solenoid))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Solenoid
            .findAll({ 
                //where: { deviceid: parseInt(req.params.deviceid) }
	        })
            .then(solenoids => res.status(200).send(solenoids))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Solenoid.update({        
            deviceId: parseInt(req.body.deviceid),
            name: req.body.name,
            description: req.body.description,
            hardwaretype: req.body.hardwaretype,
            requiresPump: req.body.requiresPump,
            address: req.body.address,
            value: parseInt(req.body.value)
        }, {
	        where: { id: req.body.id }
        })
        .then(solenoids => res.status(200).send(solenoids))
        .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {
       console.log('listByDevice()');
        return Solenoid
        .findAll({
            where: {deviceid: req.params.deviceid}        
        })
        .then(solenoids => res.status(200).send(solenoids))
        .catch(error => res.status(400).send(error));  
   }
};
