module.exports = (sequelize, DataTypes) => {
    const Analog = sequelize.define('Analog', {           
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        description: {
            type: DataTypes.STRING,
            allowNull:false
        },
        hardwareType: {
            type: DataTypes.STRING,
            allowNull:false
        },
        address: {
            type: DataTypes.STRING,
            allowNull:false
        }, 
        multiplier: {
            type: DataTypes.DOUBLE,
            allowNull:false
        },
        rawValue: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        units: {
            type: DataTypes.STRING,
            allowNull:false
        }, 
        value: {
            type: DataTypes.DOUBLE,
            allowNull:false
        }    
    });

    Analog.associate = (models) => {
        Analog.belongsTo(models.Device, {
            foreignKey: 'deviceId',
            onDelete: 'CASCADE',
        });
    };

    return Analog;
  };
  