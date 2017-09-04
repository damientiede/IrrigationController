module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventtype: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    eventvalue: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    classMethods: {
      associate: (models) => {
       // EventHistory.hasMany(models.EventType, {
       //   foreignKey: 'eventtypeId',
       //   as 'eventTypes'
       // });
        // associations can be defined here
      }
    }
  });
  return Event;
};
