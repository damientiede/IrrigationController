module.exports = (sequelize, DataTypes) => {
  const EventType = sequelize.define('EventType', {
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return EventType;
};
