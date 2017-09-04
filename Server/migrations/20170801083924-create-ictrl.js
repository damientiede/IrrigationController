'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return [
      //schedules
      queryInterface.createTable('Schedules', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        stationId: {
            type: Sequelize.INTEGER
        },
        start: {
            type: Sequelize.DATE
        },
        duration: {
            type: Sequelize.INTEGER
        },
        repeat: {
            type: Sequelize.BOOLEAN
        },
        interval: {
            type: Sequelize.INTEGER
        },
        enabled: {
            type: Sequelize.BOOLEAN
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
      }),
      //status
      queryInterface.createTable('Statuses', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        state: {
            type: Sequelize.STRING
        },
        mode: {
            type: Sequelize.STRING
        },
        pressure: {
            type: Sequelize.INTEGER
        },
        station: {
            type: Sequelize.INTEGER
        },
        start: {
            type: Sequelize.DATE
        },
        duration: {
            type: Sequelize.INTEGER
        },
        scheduleId: {
            type: Sequelize.INTEGER
        },
        inputs: {
            type: Sequelize.STRING
        },
        outputs: {
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
      }),
      //commandtype
      queryInterface.createTable('CommandTypes', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
      }),
      //commands
      queryInterface.createTable('Commands', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        commandtype: {
            type: Sequelize.INTEGER
        },
        params: {
            type: Sequelize.STRING
        },
        issued: {
            type: Sequelize.DATE
        },
        actioned: {
            type: Sequelize.DATE
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
      }),
      //eventtype
      queryInterface.createTable('EventTypes', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
      }),
      //event
      queryInterface.createTable('Events', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        eventtype: {
            type: Sequelize.INTEGER
        },
        eventvalue: {
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
      })
    ]},
  down: function(queryInterface, Sequelize) {
    return [
      //schedules
      queryInterface.dropTable('Schedules'),
      //statuses
      queryInterface.dropTable('Statuses'),
      //commands
      queryInterface.dropTable('Commands'),
      //commandtypes
      queryInterface.dropTable('CommandTypes'),
      //eventtypes
      queryInterface.dropTable('EventTypes'),
      //events
      queryInterface.dropTable('Events')
    ]
  }
};
