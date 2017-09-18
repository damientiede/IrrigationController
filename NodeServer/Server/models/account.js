module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {      
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        address: {
            type: DataTypes.STRING,
            allowNull:false
        },      
    });
    
    Account.associate = (models) => {
        Account.hasMany(models.Device, {
            foreignKey: 'deviceId',
            as: 'devices',
        });
    };

    return Account;
  };
  