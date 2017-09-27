const eventTypes = require('./eventtypes');
const commandTypes = require('./commandtypes');
const devices = require('./devices');
const accounts = require('./accounts');
const solenoids = require('./solenoids');
const spis = require('./spis');

const seedAll = () => {
    eventTypes.seed();
    commandTypes.seed();
    devices.seed();
    accounts.seed();
    //users.seed();    
    solenoids.seed();
    spis.seed();
}
module.exports = {    
    seedAll
};

