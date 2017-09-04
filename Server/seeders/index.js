const eventTypes = require('./eventtypes');
const commandTypes = require('./commandtypes');
const status = require('./status');

const seedEventTypes = () => {
    eventTypes.seed();
}
const seedCommandTypes = () => {
    commandTypes.seed();
}
const seedStatus = () => {
    status.seed();
}
const seedAll = () => {
    seedEventTypes();
    seedCommandTypes();
    seedStatus();
}
module.exports = {
    seedEventTypes,
    seedCommandTypes,
    seedStatus,
    seedAll
};

