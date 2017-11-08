const Alarm = require('../models').Alarm;

module.exports = {
   create(req, res) {      
        return Alarm
            .create({            
                name: req.body.Name,
                description: req.body.Description,
                hardwareType: req.body.HardwareType,            
                address: req.body.Address,
                deviceId: parseInt(req.body.DeviceId),
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
            .findAll()
            .then(alarms => res.status(200).send(alarms))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Alarm
            .update({        
                deviceId: parseInt(req.body.DeviceId),
                name: req.body.Name,
                hardwareType: req.body.HardwareType,            
                address: req.body.Address,
                value: req.body.Value
            }, {
	            where: { id: req.body.id }
            })
            .then(alarm => res.status(200).send(alarm))
            .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {    
        return Alarm
        .findAll({
            where: {deviceId: req.params.deviceId}        
        })
        .then(alarms => res.status(200).send(alarms))
        .catch(error => res.status(400).send(error));  
        }
};
