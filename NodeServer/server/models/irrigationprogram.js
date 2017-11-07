module.exports = (sequelize, DataTypes) => {
    const IrrigationProgram = sequelize.define('IrrigationProgram', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false
      },
      finished: {
        type: DataTypes.DATE,
        allowNull: true
      },
      duration:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      solenoidId:{
        type: DataTypes.INTEGER,
        allowNull: false
      },      
      requiresPump:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    });

    IrrigationProgram.associate = (models) => {
        IrrigationProgram.belongsTo(models.Device, {
            foreignKey: 'deviceId',
            onDelete: 'CASCADE',
        });
    };
  
    return IrrigationProgram;
}