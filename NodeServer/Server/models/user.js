module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {        
      email: {
          type: DataTypes.EMAIL,
          allowNull:false
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull:false
      },
      description: {
        type: DataTypes.STRING,
        allowNull:false
      },
      address: {
        type: DataTypes.STRING,
        allowNull:false
      }    
    });

    User.associate = (models) => {
      User.hasOne(models.Account, {
        foreignKey: 'accountId',
        as: 'account'
      })
    };

    User.associate = (models) => {
      User.hasMany(models.Device, {
        foreignKey: 'deviceId',
        as: 'devices'
      })
    };      
    return User;
  };
  