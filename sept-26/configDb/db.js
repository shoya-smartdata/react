const { Sequelize } = require('sequelize');


const connection = new Sequelize(
    'smartdata', 'root', 'smart@2099',
    { host: 'localhost', 
     dialect: 'mysql'}
)


try {
    connection.authenticate()
    console.log('Connection has been established successfully.');
} catch (error) {
    console.log("some error occured", error);
    
}

module.exports = connection;