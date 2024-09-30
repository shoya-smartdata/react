const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            isEmail: {
                msg: "Must provide a valid email address"
            },
            notNull: {
                msg: "Email cannot be null"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            notNull: {
                msg: "Password cannot be null"
            },
            len: {
                args: [8, 100],  
                msg: "Password must be at least 8 characters long"
            },
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/,  
                msg: "Password must contain one uppercase letter, one lowercase letter, one digit, and one special character"
            }
        }
    }
});

User.sync({ force: true });

module.exports = User;
