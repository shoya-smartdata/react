let mysql = require('mysql2');


let db = mysql.createConnection(
    {
    host: "localhost",
    user: "root",
    password: "",
    database: "smartdata",
  
})

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the database!");
   

});



module.exports = db;