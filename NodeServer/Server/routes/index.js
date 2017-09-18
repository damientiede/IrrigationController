const eventsController = require('../controllers').events;
const commandsController = require('../controllers').commands;
const statusController = require('../controllers').status;
const configsController = require('../controllers').configs;

module.exports = (app) => {
   app.get('/api',(req, res) => res.status(200).send({
      message: 'Welcome to Events API',
   }));

   app.post('/api/events', eventsController.create);
   app.get('/api/events', eventsController.list);
   app.get('/api/commands', commandsController.pending);
   app.put('/api/commands', commandsController.update);
   app.post('/api/commands', commandsController.create);
   app.get('/api/status', statusController.get);
   //app.put('/api/status', statusController.update);
   app.get('/api/config', configsController.list);
   app.post('/api/config', configsController.create);
   app.put('/api/config', configsController.update);
};

