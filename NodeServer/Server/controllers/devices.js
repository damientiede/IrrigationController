const Device = require('../models').Device;
const Solenoid = require('../models').Solenoid;
const Alarm = require('../models').Alarm;
const Spi = require('../models').Spi;
const Analog = require('../models').Analog;
const Command = require('../models').Command;

module.exports = {
   create(req, res) {      
        return Device
            .create({            
                name: req.body.firstName,
                description: req.body.description,
                mode:req.body.mode,
                state:req.body.state,
                start:req.body.start,
                duration:req.body.duration,
                solenoid:req.body.solenoid,
                softwareVersion:req.body.softwareVersion
            })
            .then(device => res.status(201).send(device))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Device
            .find({
                where: {id: req.params.id},
                include: [{all:true}]
/*                 include: [
                    {model: Solenoid, as: 'solenoids'},
                    {model: Spi, as: 'spis'},
                ]                
 */            })
            .then(device => res.status(200).send(device))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Device
            .findAll()
            .then(devices => res.status(200).send(devices))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Device
            .update({        
                name: req.body.firstName,
                description: req.body.description,
                mode:req.body.mode,
                state:req.body.state,
                start:req.body.start,
                duration:req.body.duration,
                solenoid:req.body.solenoid,
                softwareVersion:req.body.softwareVersion            
            }, {
	            where: { id: req.body.id }
            })
            .then(device => res.status(200).send(device))
            .catch(error => res.status(400).send(error));
   },
};
