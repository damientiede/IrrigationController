const eventsController = require('../controllers').events;
const commandsController = require('../controllers').commands;
const statusController = require('../controllers').status;
const accountsController = require('../controllers').accounts;
const devicesController = require('../controllers').devices;
const solenoidsController = require('../controllers').solenoids;
const alarmsController = require('../controllers').alarms;
const analogsController = require('../controllers').analogs;
const spisController = require('../controllers').spis;
const usersController = require('../controllers').users;
const deviceStatusController = require('../controllers').deviceStatuses;

module.exports = (app) => {
   app.get('/api',(req, res) => res.status(200).send({
      message: 'Welcome to Events API',
   }));

   //Events
   app.post('/api/events', eventsController.create);
   app.get('/api/events/:deviceid', eventsController.list);

   //Commands
   app.get('/api/commands/:deviceid', commandsController.list);
   app.get('/api/pendingcommands/:deviceid', commandsController.pending);
   app.put('/api/commands/:commandid', commandsController.update);
   app.post('/api/commands', commandsController.create);

   //DeviceStatus
   app.get('/api/devicestatus/:deviceid', deviceStatusController.single);

   //Accounts
   app.post('/api/accounts', accountsController.create);
   app.get('/api/accounts/:id', accountsController.single);
   app.get('/api/accounts', accountsController.list);
   app.put('/api/accounts/:id', accountsController.update);
   app.delete('/api/accounts/:id', accountsController.delete);
   //Users
   app.post('/api/users', usersController.create);
   app.get('/api/users/:id', usersController.single);
   app.get('/api/users', usersController.list);
   app.put('/api/users/:id', usersController.update);

   //Devices
   app.post('/api/devices', devicesController.create);
   app.get('/api/devices/:id', devicesController.single);
   app.get('/api/devices', devicesController.list);
   app.put('/api/devices/:id', devicesController.update);
   
   //Solenoids
   app.post('/api/solenoids', solenoidsController.create);
   app.get('/api/solenoids/:id', solenoidsController.single);
   app.get('/api/solenoids/:deviceid', solenoidsController.list);
   app.put('/api/solenoids/:id', solenoidsController.update);

   //Alarms
   app.post('/api/alarms', alarmsController.create);
   app.get('/api/alarms/:id', alarmsController.single);
   app.get('/api/alarms/:deviceid', alarmsController.list);
   app.put('/api/alarms/:id', alarmsController.update);

   //Analogs
   app.post('/api/analogs', analogsController.create);
   app.get('/api/analogs/:id', analogsController.single);
   app.get('/api/analogs/:deviceid', analogsController.list);
   app.put('/api/analogs/:id', analogsController.update);

   //Spis
   app.post('/api/spis', spisController.create);
   app.get('/api/spis/:id', spisController.single);
   app.get('/api/spis/:deviceid', spisController.list);
   app.put('/api/spis/:id', spisController.update);

};

