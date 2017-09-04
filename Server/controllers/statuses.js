const Statuses = require('../models').Status;

module.exports = {
   list(req, res) {
      return Statuses
         .all()
         .then(status => res.status(200).send(status))
         .catch(error => res.status(400).send(error));
   },
   update(req, res) {
      return Statuses.update({
         state: req.body.state,
         mode: req.body.mode,
         pressure: req.body.pressure,
         station: req.body.station,
         start: req.body.start,
         duration: req.body.duration,
         scheduleId: req.body.scheduleId,
         inputs: req.body.inputs,
         outputs: req.body.outputs
      }, {
	 where: { id: 1 }
      })
      .then(status => res.status(200).send(status))
      .catch(error => res.status(400).send(error));
   },
};
