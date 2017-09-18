module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    stationId: { 
      type:DataTypes.INTEGER,
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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Schedule;
};
