const IrrigationProgram = require('../models').IrrigationProgram;
const Utils = require('../utils');
const moment = require('moment');
const sequelize = require('sequelize');

module.exports = {
   create(req, res) {      
        return IrrigationProgram
            .create({            
                name: req.body.Name,
                start: req.body.Start,
                duration: req.body.Duration,
                solenoidId: parseInt(req.body.SolenoidId),
                requiresPump: req.body.RequiresPump,
                deviceId: req.body.DeviceId
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
   update(req, res) {       
        return IrrigationProgram
            .update({                    
                finished: req.body.Finished,                                  
            }, {
                where: { id: req.params.id }
            })
            .then(irrigationProgram => res.status(200).send(irrigationProgram))
            .catch(error => res.status(400).send(error));
   },  
   listByDevice(req, res) {       
        return IrrigationProgram
            .findAll({
                where: {deviceId: req.params.deviceId}        
            })
            .then(irrigationPrograms => res.status(200).send(irrigationPrograms))
            .catch(error => res.status(400).send(error));  
   },
   activeByDevice(req, res) {
       console.log(moment());
       return IrrigationProgram
            .findAll({
                where: {
                    deviceId: req.params.deviceId,                                    
                    finished: null,
                },
                order: [
                    ['createdAt','DESC']
                ],
                limit: 1               
            })
            .then(irrigationPrograms => res.status(200).send(irrigationPrograms))
            .catch(error => res.status(400).send(error));
   }
};