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
    days: {
      type:DataTypes.STRING,
      allowNull:false
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
