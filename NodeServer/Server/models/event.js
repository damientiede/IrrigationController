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
    });
    Event.associate = (models) => {
      Event.belongsTo(models.Device, {
          foreignKey: 'deviceId',
          onDelete: 'CASCADE',
      });
    }; 
    return Event;
};
