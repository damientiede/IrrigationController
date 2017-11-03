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
      values:['Manual','Auto','Diagnostic']
    },
    state: {
        type: DataTypes.ENUM,
        values:['Standby','Irrigating','Fault']
    },
    status: DataTypes.STRING,
    pumpSolenoidId: DataTypes.INTEGER,
    softwareVersion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deviceMAC: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Device.associate = (models) => {
    Device.hasMany(models.Solenoid, {
      foreignKey: 'deviceId',
      as: 'solenoids',
    });
    Device.hasMany(models.Alarm, {
      foreignKey: 'deviceId',
      as: 'alarms'
    });
    Device.hasMany(models.Analog, {
      foreignKey: 'id',
      as: 'analogs'
    });
    Device.hasMany(models.Spi, {
      foreignKey: 'deviceId',
      as: 'spis'
    });
    Device.hasMany(models.Schedule, {
      foreignKey: 'deviceId',
      as: 'schedules'
    }); 
  };

  return Device;
};
