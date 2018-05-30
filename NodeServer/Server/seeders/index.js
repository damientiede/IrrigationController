const eventTypes = require('./eventtypes');
const commandTypes = require('./commandtypes');
const devices = require('./devices');
const accounts = require('./accounts');
const solenoids = require('./solenoids');
const schedules = require('./schedules');
const analogs = require('./analogs');
const spis = require('./spis');
const alarms = require('./alarms');
const commands = require('./commands');

const seedAll = () => {
    eventTypes.seed();
    commandTypes.seed();
    devices.seed(spis, analogs, solenoids, alarms, schedules, ()=> {
        spis.seed();
        analogs.seed();
        solenoids.seed(schedules, () => {
            schedules.seed();
        });
        alarms.seed();
    });    
    accounts.seed();    
    commands.seed();
}

module.exports = {    
    seedAll
};

