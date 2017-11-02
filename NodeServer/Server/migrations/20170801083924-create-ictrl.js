'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
    return [
        //devices        
        queryInterface.createTable('Devices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull:false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            mode: {
                type: Sequelize.ENUM,
                values:['Manual','Auto','Diagnostic'],
                default:'Manual'
            },
            state: {
                type: Sequelize.ENUM,
                values:['Standby','Irrigating','Fault'],
                default:'Standby'
            },   
            manualStart: {
                type: Sequelize.DATE                
            },
            manualDuration: {
                type: Sequelize.INTEGER                
            },
            manualSolenoid: {
                type: Sequelize.INTEGER
            }, 
            pumpSolenoid: {
                type: Sequelize.INTEGER
            }, 
            deviceMAC: {
                type: Sequelize.STRING
            },
            softwareVersion: {
                type: Sequelize.STRING,
                allowNull: false
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
        //accounts
        queryInterface.createTable('Accounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
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
        }),   
        //users                
        queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull:false
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull:false
            },
            email: {
                type: Sequelize.STRING,
                allowNull:false
            },
            mobile: {
                type: Sequelize.STRING,
                allowNull:false
            },      
            password: {
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
        //solenoids
        queryInterface.createTable('Solenoids', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull:false
            },
            description: {
                type: Sequelize.STRING,
                allowNull:false
            },
            hardwareType: {
                type: Sequelize.ENUM,
                values: ['GPIO', 'Distributed', 'SPI']
            },
            address: {
                type: Sequelize.STRING,
                allowNull:false
            }, 
            value: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            requiresPump: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
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
                type: Sequelize.STRING,
                allowNull:false
            },
            Clock: {
              type: Sequelize.INTEGER,
              allowNull:false
            },
            CS: {
                type: Sequelize.INTEGER,
                allowNull:false
              },
            MISO: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            MOSI: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
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
        //alarms
        queryInterface.createTable('Alarms', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull:false
            },
            description: {
                type: Sequelize.STRING,
                allowNull:false
            },
            hardwareType: {
                type: Sequelize.ENUM,
                values:['GPIO','Distributed','SPI']
            },
            address: {
                type: Sequelize.STRING,
                allowNull:false
            },  
            value: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
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
                type: Sequelize.STRING,
                allowNull:false
            },
            description: {
                type: Sequelize.STRING,
                allowNull:false
            },
            hardwareType: {
                type: Sequelize.STRING,
                allowNull:false
            },
            address: {
                type: Sequelize.STRING,
                allowNull:false
            }, 
            multiplier: {
                type: Sequelize.DOUBLE,
                allowNull:false
            },
            rawValue: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            units: {
                type: Sequelize.STRING,
                allowNull:false
            }, 
            value: {
                type: Sequelize.DOUBLE,
                allowNull:false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
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
        //commands
        queryInterface.createTable('Commands', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            commandType: {
                type: Sequelize.INTEGER
            },
            params: {
                type: Sequelize.STRING
            },
            issued: {
                type: Sequelize.DATE,
                allowNull:false
            },
            actioned: {
                type:Sequelize.DATE,
                allowNull:true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'id',
                    as: 'deviceId'
                },
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
            name: {
                type: Sequelize.STRING
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
            },
            deviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'id',
                    as: 'deviceId'
                },
            },
            solenoidId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Solenoids',
                    key: 'id',
                    as: 'solenoidId'
                }
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
            eventType: {
                type: Sequelize.INTEGER
            },
            eventValue: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
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
        })             
    ]},      
    down: function(queryInterface, Sequelize) {
    return [        
        //accounts
        queryInterface.dropTable('Accounts'),
        //alarms
        queryInterface.dropTable('Alarms'),
        //analogs
        queryInterface.dropTable('Analogs'),
        //commands
        queryInterface.dropTable('Commands'),
        //commandtypes
        queryInterface.dropTable('CommandTypes'),        
        //events
        queryInterface.dropTable('Events'),
        //eventtypes
        queryInterface.dropTable('EventTypes'),
        //solenoids
        queryInterface.dropTable('Solenoids'),
        //schedules
        queryInterface.dropTable('Schedules'),        
        //spis
        queryInterface.dropTable('Spis'),
        //users
        queryInterface.dropTable('Users'),
        //devices
        queryInterface.dropTable('Devices'),
    ]
  }
};
