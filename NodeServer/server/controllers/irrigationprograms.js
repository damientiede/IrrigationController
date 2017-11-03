const IrrigationProgram = require('../models').IrrigationProgram;
const Utils = require('../utils');

module.exports = {
   create(req, res) {      
        return IrrigationProgram
            .create({            
                name: req.body.name,
                start: req.body.Start,
                duration: req.body.Duration,
                solenoidId: parseInt(req.body.SolenoidId),
                requiresPump: req.body.RequiresPump,
                deviceId: req.body.deviceId
            })
            .then(irrigationProgram => res.status(201).send(irrigationProgram))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return IrrigationProgram
            .findById(req.params.id)
            .then(irrigationProgram => res.status(200).send(irrigationProgram))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return IrrigationProgram
            .findAll()
            .then(irrigationPrograms => res.status(200).send(irrigationPrograms))
            .catch(error => res.status(400).send(error));
   },   
   listByDevice(req, res) {       
        return IrrigationProgram
        .findAll({
            where: {deviceId: req.params.deviceId}        
        })
        .then(irrigationPrograms => res.status(200).send(irrigationPrograms))
        .catch(error => res.status(400).send(error));  
   }
};
