const express = require("express");
const app = express();
const PORT = 4000;

const connection = require("./databaseconfig");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("your app is running !");
});

app.get("/api/getuser", (_req, res) => {
  connection.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      return console.log("unable to get data", err);
    } else {
      res.json({ result });
    }
  });
});

//add users api

app.post("/api/adduser", (req, res) => {
  const { name, email, phone, address } = req.body;
  const query = `INSERT INTO employee ( name, email, phone, address) VALUES ( ?, ?, ?, ?)`;
  connection.query(query, [name, email, phone, address], (err, result) => {
    if (err) {
      console.log("error  in inserting users", err);
      return res.status(500).send("error quering the database !");
    }
    res.status(201).json({ message: "User added successfully", result });
  });
});

//delete user !
app.delete("/api/deleteuser", (req, res) => {
  const { id, email } = req.body;

  // Validate input
  if (!id || !email) {
    return res.status(400).send({ message: "ID and email are required" });
  }

  const data = [id, email];
  const query = `DELETE FROM employee WHERE id = ? AND email = ?`;

  connection.query(query, data, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Employee not found" });
    }

    res.send({ message: "Employee deleted successfully" });
  });
});

//update user !
app.patch("/api/update-users/:id", (req, res) => {
  const { id, name, email, phone, address } = req.body;
  console.log(req.body);

  const parameter = [name, email, phone, address, id];

  const query = `UPDATE employee SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?`;

  connection.query(query, parameter, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Error updating user" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ message: "User updated successfully!" });
  });
});

//filter data api !

app.get("/api/users", (req, res) => {
  const searchTerm = req.query.searchTerm || "";
  const sql = `
        SELECT * FROM employee 
        WHERE id LIKE ? OR name LIKE ? OR email LIKE ? OR phone LIKE ? OR address LIKE ?
    `;
  const queryParams = [
    `%${searchTerm}%`,
    `%${searchTerm}%`,
    `%${searchTerm}%`,
    `%${searchTerm}%`,
    `%${searchTerm}%`,
  ];

  connection.query(sql, queryParams, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//admin  authentication handle :

app.get("/app/loginadmin", (req, res, next) => {
  connection.query(`SELECT * FROM admin`, (err, result) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json({
        result,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`your app is running successFully ! ${PORT}`);
});
