const Event = require('../models').Event;

module.exports = {
   create(req, res) {           
      return Event
         .create({
            eventType: parseInt(req.body.EventType),
            eventValue: req.body.EventValue,
            deviceId: parseInt(req.body.DeviceId)
         })
         .then(event => res.status(201).send(event))
         .catch(error => res.status(400).send(error));
   },
   list(req, res) {
      return Event
         .findAll({ 
            where: { deviceId: parseInt(req.params.deviceId) }
         })
         .then(events => res.status(200).send(events))
         .catch(error => res.status(400).send(error));
   }
};
