module.exports = (sequelize, DataTypes) => {
  const CommandType = sequelize.define('CommandType', {
    title: {
      type: DataTypes.STRING,
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
  return CommandType;
};
