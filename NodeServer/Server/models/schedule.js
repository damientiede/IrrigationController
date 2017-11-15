module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    name: { 
      type:DataTypes.STRING,
      allowNull:false
    },   
    startDate: { 
      type:DataTypes.DATE,
      allowNull:true
    },
    startHours: {
      type:DataTypes.INTEGER,
      allowNull:true
    },
    startMins: {
      type:DataTypes.INTEGER,
      allowNull:true
    },    
    duration: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    days: {
      type:DataTypes.STRING,
      allowNull:true
    },
    repeat: DataTypes.BOOLEAN,    
    enabled: DataTypes.BOOLEAN  
  });

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.Solenoid, {
      foreignKey: 'solenoidId',
      onDelete: 'CASCADE'      
    });
    Schedule.belongsTo(models.Device, {
        foreignKey: 'deviceId',
        onDelete: 'CASCADE',
    }); 
  };

  return Schedule;
};
