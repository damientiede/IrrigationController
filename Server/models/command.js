module.exports = (sequelize, DataTypes) => {
  const Command = sequelize.define('Command', {
    commandtype: { 
      type: DataTypes.INTEGER,
      allowNull:false
    },
    params: DataTypes.STRING,
    issued: {
      type: DataTypes.DATE,
      allowNull:false
    },
    actioned: {
      type:DataTypes.DATE,
      allowNull:true
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Command;
};
