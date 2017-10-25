module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      eventType: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      eventValue: {
        type: DataTypes.STRING,
        allowNull:false
      }  
    });
    Event.associate = (models) => {
      Event.belongsTo(models.Device, {
          foreignKey: 'deviceId',
          onDelete: 'CASCADE',
      });
    }; 
    return Event;
};
