const Command = require('../models').Command;

module.exports = {
   create(req, res) {      
      return Command
         .create({
            commandtype: parseInt(req.body.commandtype),
            params: req.body.params,
	      issued: new Date(),
            actioned: null,
            deviceId: parseInt(req.body.deviceid)
         })
         .then(command => res.status(201).send(command))
         .catch(error => res.status(400).send(error));
   },
   list(req, res) {
      return Command
         .findAll({ 
            where: { 
                  deviceid: parseInt(req.params.deviceid)                  
            }
          })         
         .then(commands => res.status(200).send(commands))
         .catch(error => res.status(400).send(error));
   },
   pending(req, res) {
      return Command
         .findAll({ 
            where: { 
                  deviceid: parseInt(req.params.deviceid),
                  actioned:null
            }
          })         
         .then(commands => res.status(200).send(commands))
         .catch(error => res.status(400).send(error));
   },
   update(req, res) {
      return Command.update({
         actioned: Date.parse(req.body.actioned)
      }, {
	 where: { id: req.params.commandid }
      })
      .then(command => res.status(200).send(command))
      .catch(error => res.status(400).send(error));
   },
};
