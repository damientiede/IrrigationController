const Solenoid = require('../models').Solenoid;
const Utils = require('../utils');

/* function parseHardwareType(hwType)
{    
    if (hwType == 0) { return 'GPIO';}
    if (hwType == 1) { return 'Distributed';}
    if (hwType == 2) { return 'SPI';}    
    return 'None';
} */
module.exports = {
   create(req, res) {      
        return Solenoid
            .create({            
                name: req.body.name,
                description: req.body.description,
                hardwareType: req.body.hardwareType,            
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
            .findAll()
            .then(solenoids => res.status(200).send(solenoids))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Solenoid.update({        
            deviceId: parseInt(req.body.DeviceId),
            name: req.body.Name,
            description: req.body.Description,
            hardwareType: Utils.parseHardwareType(req.body.HardwareType),
            requiresPump: req.body.RequiresPump,
            address: req.body.Address,
            value: parseInt(req.body.Value)
        }, {
	        where: { id: req.params.id }
        })
        .then(solenoid => res.status(200).send(solenoid))
        .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {       
        return Solenoid
        .findAll({
            where: {deviceId: req.params.deviceId}        
        })
        .then(solenoids => res.status(200).send(solenoids))
        .catch(error => res.status(400).send(error));  
   }
};
