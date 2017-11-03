const Device = require('../models').Device;
const Utils = require('../utils');

module.exports = {
   create(req, res) {      
        return Device
            .create({            
                name: req.body.firstName,
                description: req.body.description,
                mode:'Manual',
                state:'Standby',
                status:'Created',
                programStart:req.body.manualStart,
                programDuration:req.body.manualDuration,
                programSolenoid:req.body.manualSolenoid,
                pumpSolenoid:req.body.pumpSolenoid,
                softwareVersion:req.body.softwareVersion,
                deviceMAC:req.body
            })
            .then(device => res.status(201).send(device))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Device
            .find({
                where: {id: req.params.id}
                //include: [{all:true}]
             })
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
                name: req.body.Name,
                description: req.body.Description,
                mode: Utils.parseDeviceMode(req.body.Mode),
                state: Utils.parseDeviceState(req.body.State),
                status: req.body.Status,
                pumpSolenoidId:req.body.PumpSolenoid,
                softwareVersion:req.body.SoftwareVersion,
                updatedAt:new Date()            
            }, {
	            where: { id: req.params.id }
            })
            .then(device => res.status(200).send(device))
            .catch(error => res.status(400).send(error));
   },
   register(req, res) {
        return Device
            .findOrCreate({
                where:{deviceMAC:req.params.deviceMAC},
                defaults:{
                    name:'DeviceName',
                    description:'Device description',
                    mode:'Manual',
                    state:'Standby',
                    status:'Created',
                    softwareVersion:'0.0.0.1'
                    //deviceMAC: req.params.mac
                }
            })
            .spread((device,created) => {
                if (created) {
                    console.log("New device successfully registered");
                }
                res.status(201).send(device);
            })
            .catch(error => res.status(400).send(error));
   }
};
