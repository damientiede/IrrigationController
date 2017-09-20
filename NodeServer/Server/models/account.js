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

    return Account;
  };
  