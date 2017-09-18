'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return [
        //accounts
        queryInterface.createTable('Accounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            description: {
                type: DataTypes.STRING,
                allowNull:false
            },
            hardwareType: {
                type: DataTypes.ENUM,
                values:['GPIO','Distributed','SPI']
            },
            address: {
                type: DataTypes.STRING,
                allowNull:false
            },
            userId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'userId'
                },
            }
        }),
        //alarms
        queryInterface.createTable('Alarms', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                allowNull:false
            },
            address: {
                type: DataTypes.STRING,
                allowNull:false
            },
            deviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'id',
                    as: 'deviceId'
                },
            }
        }),
        //analogs
        queryInterface.createTable('Analogs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                allowNull:false
            },
            address: {
                type: DataTypes.STRING,
                allowNull:false
            },
            deviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'id',
                    as: 'deviceId'
                },
            }
        }),
        //devices        
        queryInterface.createTable('Devices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                allowNull:false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mode: {
                type: DataTypes.ENUM,
                values:['Manual','Auto','Off']
            },
            state: {
                type: DataTypes.ENUM,
                values:['Monitoring','Irrigating','Fault','Off']
            },          
            softwareVersion: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }),


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

        //solenoids
        queryInterface.createTable('Solenoids', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                allowNull:false
            },
            description: {
                type: DataTypes.STRING,
                allowNull:false
            },
            hardwareType: {
                type: DataTypes.ENUM,
                values: ['GPIO', 'Distributed', 'SPI']
            },
            address: {
                type: DataTypes.STRING,
                allowNull:false
            }, 
            value: {
                type: DataTypes.INTEGER,
                allowNull:false
            },
            deviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'id',
                    as: 'deviceId'
                },
            }
        }),  
        //spis
        queryInterface.createTable('Spis', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                allowNull:false
            },
            ADCClock: {
              type: DataTypes.INTEGER,
              allowNull:false
            },
            ADCCS: {
                type: DataTypes.INTEGER,
                allowNull:false
              },
            MISO: {
                type: DataTypes.INTEGER,
                allowNull:false
            },
            MOSI: {
                type: DataTypes.INTEGER,
                allowNull:false
            },
            deviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'id',
                    as: 'deviceId'
                },
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
      }),
      //event
      queryInterface.createTable('Configs', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        deviceid: {
            type: Sequelize.INTEGER,
            allowNull:false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        hardwaretype: {
            type: Sequelize.INTEGER,
            allowNull:false
        },
        channeltype: {
            type: Sequelize.INTEGER,
            allowNull:false
        },      
        address: {
            type: Sequelize.STRING,
            allowNull:false
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
      queryInterface.dropTable('Events'),
      //configs
      queryInterface.dropTable('Configs')
    ]
  }
};
