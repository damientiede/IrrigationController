module.exports = (sequelize, DataTypes) => {
    const Alarm = sequelize.define('Alarm', {           
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
    });
    
    Alarm.associate = (models) => {
        Solenoid.belongsTo(models.Device, {
            foreignKey: 'deviceId',
            onDelete: 'CASCADE',
        });
    };
    
    return Alarm;
  };
  