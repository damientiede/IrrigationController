const Schedule = require('../models').Schedule;

module.exports = {
   create(req, res) {      
        return Schedule
            .create({            
                name: req.body.Name,
                start: req.body.Start,
                duration: parseInt(req.body.Duration),            
                repeat: req.body.Repeat,
                interval: parseInt(req.body.Interval),
                enabled:req.body.Enabled,
                solenoidId: parseInt(req.body.SolenoidId),
                deviceId: parseInt(req.body.DeviceId)
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
            .findAll()
            .then(schedules => res.status(200).send(schedules))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Schedule
            .update({        
                name: req.body.Name,
                start: req.body.Start,
                duration: parseInt(req.body.Duration),            
                repeat: req.body.Repeat,
                interval: parseInt(req.body.Interval),
                enabled:req.body.Enabled,
                solenoidId: parseInt(req.body.SolenoidId),
                deviceId: parseInt(req.body.DeviceId)
            }, {
	            where: { id: req.body.Id }
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
