module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
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
        values:['Monitoring','Irrigating','Fault']
    },
    start: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    solenoid: DataTypes.STRING,    
    softwareVersion: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Device.associate = (models) => {
    Device.hasMany(models.Solenoid, {
      foreignKey: 'solenoidId',
      as: 'solenoids',
    });
    Device.hasMany(models.Alarm, {
      foreignKey: 'alarmId',
      as: 'alarms'
    });
  };

  return Device;
};
