const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
    host: "localhost",
    user: "root",
    password: "smart@2099",
    database: "smartdata"

    }
)

connection.connect(
   err => {
        if(err){
            console.log("error founded !", err);
            return ;

        }
        console.log("database connected successfully !");
        
    }

)

module.exports = connection;