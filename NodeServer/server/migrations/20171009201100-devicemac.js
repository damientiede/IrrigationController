'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return [
            //devices
            queryInterface.addColumn(
                'Devices',
                'deviceMAC', 
                {
                    type:Sequelize.STRING,
                    allowNull: false
                }
            )
        ]
    },
    down: function(queryInterface, Sequelize) {
        return [
            //devices
            queryInterface.removeColumn(
                'Devices',
                'deviceMAC'
            )
        ]
    }
};