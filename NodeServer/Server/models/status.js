module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    state: {
      type:DataTypes.STRING,
      allowNull:false
    },
    mode: {
      type:DataTypes.STRING,
      allowNull:false
    },
    pressure: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    station: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    start: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    scheduleId: DataTypes.INTEGER,
    inputs: DataTypes.STRING,
    outputs: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Status;
};
