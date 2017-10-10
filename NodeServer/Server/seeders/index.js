const eventTypes = require('./eventtypes');
const commandTypes = require('./commandtypes');
const devices = require('./devices');
const accounts = require('./accounts');
const solenoids = require('./solenoids');
const spis = require('./spis');
const alarms = require('./alarms');

const seedAll = () => {
    eventTypes.seed();
    commandTypes.seed();
    devices.seed();
    accounts.seed();
    //users.seed();    
    solenoids.seed();
    spis.seed();
    alarms.seed();
}
module.exports = {    
    seedAll
};

