const Alarm = require('../models').Alarm;

module.exports = {
   create(req, res) {      
        return Alarm
            .create({            
                name: req.body.name,
                description: req.body.description,
                hardwareType: req.body.hardwareType,            
                address: req.body.address,
                deviceId: parseInt(req.body.deviceId),
                value:0
            })
            .then(alarm => res.status(201).send(alarm))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Alarm
            .findById(req.params.id)
            .then(alarm => res.status(200).send(alarm))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Alarm
            .findAll({ 
                where: { deviceId: parseInt(req.params.deviceid) }
	        })
            .then(alarms => res.status(200).send(alarms))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Alarm
            .update({        
                deviceId: parseInt(req.body.deviceId),
                name: req.body.name,
                hardwareType: req.body.hardwareType,            
                address: req.body.address,
                value: req.body.value
            }, {
	            where: { id: req.body.id }
            })
            .then(alarm => res.status(200).send(alarm))
            .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {    
        return Alarm
        .findAll({
            where: {deviceid: req.params.deviceid}        
        })
        .then(alarms => res.status(200).send(alarms))
        .catch(error => res.status(400).send(error));  
        }
};
