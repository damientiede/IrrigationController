module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {        
      firstName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      email: {
          type: DataTypes.STRING,
          allowNull:false
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull:false
      },      
      password: {
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

    /* User.associate = (models) => {
      User.hasMany(models.Device, {
        foreignKey: 'deviceId',
        as: 'devices'
      })
    };  */     
    return User;
  };
  