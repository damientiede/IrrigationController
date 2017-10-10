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
      message: 'Welcome to Irrigation Controller API',
   }));

   //Events
   app.post('/api/events', eventsController.create);
   app.get('/api/device/:deviceid/events', eventsController.list);

   //Commands
   app.get('/api/commands', commandsController.list);
   app.get('/api/device/:deviceid/commands', commandsController.listByDevice);
   app.get('/api/device/:deviceid/pendingcommands', commandsController.pending);
   app.put('/api/commands/:commandid', commandsController.update);
   app.post('/api/commands', commandsController.create);

   //Devices
   app.get('/api/devices', devicesController.list);
   app.get('/api/devicestatus/:deviceid', deviceStatusController.single);
   app.get('/api/device/:mac/register', devicesController.register);
   app.post('/api/devices', devicesController.create);
   app.get('/api/devices/:id', devicesController.single);   
   app.put('/api/devices/:id', devicesController.update);

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
   
   //Solenoids
   app.post('/api/solenoids', solenoidsController.create);
   app.get('/api/solenoids/:id', solenoidsController.single);
   app.get('/api/solenoids', solenoidsController.list);
   app.put('/api/solenoids/:id', solenoidsController.update);
   app.get('/api/device/:deviceid/solenoids', solenoidsController.listByDevice);

   //Alarms
   app.post('/api/alarms', alarmsController.create);
   app.get('/api/alarms/:id', alarmsController.single);
   app.get('/api/alarms/:deviceid', alarmsController.list);
   app.put('/api/alarms/:id', alarmsController.update);
   app.get('/api/device/:deviceid/alarms', alarmsController.listByDevice);

   //Analogs   
   app.post('/api/analogs', analogsController.create);
   app.get('/api/analogs/:id', analogsController.single);
   app.get('/api/analogs/:deviceid', analogsController.list);
   app.put('/api/analogs/:id', analogsController.update);
   app.get('/api/device/:deviceid/analogs', analogsController.listByDevice);

   //Spis
   app.post('/api/spis', spisController.create);
   app.get('/api/spis/:id', spisController.single);
   app.get('/api/spis/:deviceid', spisController.list);
   app.put('/api/spis/:id', spisController.update);
   app.get('/api/device/:deviceid/spis', spisController.listByDevice);
};

