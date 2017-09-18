module.exports = (sequelize, DataTypes) => {
    const Spi = sequelize.define('Spi', {                  
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
        hardwareType: {
          type: DataTypes.STRING,
          allowNull:false
        }                 
    });

    Solenoid.associate = (models) => {
      Solenoid.belongsTo(models.Device, {
        foreignKey: 'deviceId',
        onDelete: 'CASCADE',
      });
    };
    return Spi;
  };
  