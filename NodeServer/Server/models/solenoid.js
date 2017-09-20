module.exports = (sequelize, DataTypes) => {
    const Solenoid = sequelize.define('Solenoid', {          
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
        }     
    });

    Solenoid.associate = (models) => {
        Solenoid.belongsTo(models.Device, {
          foreignKey: 'deviceId',
          onDelete: 'CASCADE',
        });
    };
    
    
    , {
        classMethods: {
            associate: (models) => {
            // EventHistory.hasMany(models.EventType, {
            //   foreignKey: 'eventtypeId',
            //   as 'eventTypes'
            // });
            // associations can be defined here
            }
        }
    });
    Solenoid.belongsTo(Device);
    return Solenoid;
  };
  