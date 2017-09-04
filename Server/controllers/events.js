const Event = require('../models').Event;

module.exports = {
   create(req, res) {      
      return Event
         .create({
            eventtype: parseInt(req.body.eventtype),
            eventvalue: req.body.eventvalue,
         })
         .then(event => res.status(201).send(event))
         .catch(error => res.status(400).send(error));
   },
   list(req, res) {
      return Event
         .all()
         .then(events => res.status(200).send(events))
         .catch(error => res.status(400).send(error));
   },
};
