const Command = require('../models').Command;

module.exports = {
   create(req, res) {      
      return Command
         .create({
            commandType: parseInt(req.body.CommandType),
            params: req.body.Params,
	      issued: new Date(),
            actioned: null,
            deviceId: parseInt(req.body.deviceId)
         })
         .then(command => res.status(201).send(command))
         .catch(error => res.status(400).send(error));
   },
   list(req, res) {
      return Command
      .findAll({ limit: 100 })         
      .then(commands => res.status(200).send(commands))
      .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {
      return Command
         .findAll({ 
            where: { 
                  deviceId: parseInt(req.params.deviceId)                  
            },
            limit:100
          })         
         .then(commands => res.status(200).send(commands))
         .catch(error => res.status(400).send(error));
   },
   pending(req, res) {
      return Command
         .findAll({ 
            where: { 
                  deviceId: parseInt(req.params.deviceId),
                  actioned:null
            }
          })         
         .then(commands => res.status(200).send(commands))
         .catch(error => res.status(400).send(error));
   },
   update(req, res) {
      return Command.update({
         actioned: Date.parse(req.body.Actioned)
      }, {
	 where: { id: req.params.commandId }
      })
      .then(command => res.status(200).send(command))
      .catch(error => res.status(400).send(error));
   },
};
