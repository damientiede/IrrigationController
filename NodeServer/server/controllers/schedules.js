const Schedule = require('../models').Schedule;

module.exports = {
   create(req, res) {      
        return Schedule
            .create({            
                name: req.body.name,
                start: req.body.start,
                duration: parseInt(req.body.duration),            
                repeat: req.body.repeat,
                interval: parseInt(req.body.interval),
                enabled:req.body.enabled,
                solenoidId: parseInt(req.body.solenoidId),
                deviceId: parseInt(req.body.deviceId)
            })
            .then(schedule => res.status(201).send(schedule))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Schedule
            .findById(req.params.id)
            .then(schedule => res.status(200).send(schedule))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Schedule
            .findAll({ 
                where: { deviceId: parseInt(req.params.deviceId) }
	        })
            .then(schedules => res.status(200).send(schedules))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Schedule
            .update({        
                name: req.body.name,
                start: req.body.start,
                duration: parseInt(req.body.duration),            
                repeat: req.body.repeat,
                interval: parseInt(req.body.interval),
                enabled:req.body.enabled,
                solenoidId: parseInt(req.body.solenoidId),
                deviceId: parseInt(req.body.deviceId)
            }, {
	            where: { id: req.body.id }
            })
            .then(schedule => res.status(200).send(schedule))
            .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {    
    return Schedule
    .findAll({
        where: {deviceId: req.params.deviceId}        
    })
    .then(schedules => res.status(200).send(schedules))
    .catch(error => res.status(400).send(error));  
    }
};
