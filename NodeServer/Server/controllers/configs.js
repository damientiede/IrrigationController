const Config = require('../models').Config;

module.exports = {
   create(req, res) {      
      return Config
         .create({
            deviceid: parseInt(req.body.deviceid),
            name: req.body.name,
            hardwaretype: parseInt(req.body.hardwaretype),
            channeltype: parseInt(req.body.channeltype),
            address: req.body.address,
         })
         .then(configs => res.status(201).send(configs))
         .catch(error => res.status(400).send(error));
   },
   list(req, res) {
      return Config
         .findAll({
	     where: { deviceid: parseInt(req.body.deviceid) }
	 })
     .then(configs => res.status(200).send(configs))
     .catch(error => res.status(400).send(error));
   },
   update(req, res) {
      return Config.update({        
         deviceid: parseInt(req.body.deviceid),
         name: req.body.name,
         hardwaretype: parseInt(req.body.hardwaretype),
         channeltype: parseInt(req.body.channeltype),
         address: req.body.address,

      }, {
	  where: { id: req.body.id }
      })
      .then(configs => res.status(200).send(configs))
      .catch(error => res.status(400).send(error));
   },
};
