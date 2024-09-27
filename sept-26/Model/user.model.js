
const { DataTypes } = require('sequelize');
const sequelize = require('../configDb/db'); 
const User = sequelize.define('User', {
  
    username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

sequelize.sync();


module.exports = User;
