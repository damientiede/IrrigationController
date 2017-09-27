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
        },
        requiresPump: DataTypes.BOOLEAN     
    });

    Solenoid.associate = (models) => {
        Solenoid.belongsTo(models.Device, {
          foreignKey: 'deviceId',
          onDelete: 'CASCADE',
        });
    };            
    return Solenoid;
  };
  