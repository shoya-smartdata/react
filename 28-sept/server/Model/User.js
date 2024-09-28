import { DataTypes } from "sequelize";
import Connection from "../config/db.js";

const User = Connection.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true 
        }
    },
    phone: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8], 
                msg: "Password must be at least 8 characters long"
            },
        }
    }
}, {
    paranoid: true,
});

await User.sync();
export default User;
