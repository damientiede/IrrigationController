module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    name: { 
      type:DataTypes.STRING,
      allowNull:false
    },   
    start: { 
      type:DataTypes.DATE,
      allowNull:false
    },
    duration: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    repeat: DataTypes.BOOLEAN,
    interval: DataTypes.INTEGER,
    enabled: DataTypes.BOOLEAN  
  });
  Schedule.associate = (models) => {
    /* Schedule.hasOne(models.Solenoid, {
      foreignKey: 'solenoidId',
      as: 'solenoid'      
    }); */
    Schedule.belongsTo(models.Device, {
        foreignKey: 'deviceId',
        onDelete: 'CASCADE',
    }); 
  };
  return Schedule;
};
