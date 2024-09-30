
const {Sequelize} = require('sequelize')


const connection = new Sequelize("smartdata", "root", "smart@2099", {
    host: "localhost",
    dialect: 'mysql'
});

async function connectDatabase() {
    try {
        await connection.authenticate();  
        console.log("Database connected successfully");
    } catch (error) {
        console.error("There was an error connecting to the database:", error);
    }
}


connectDatabase();


module.exports = connection;
