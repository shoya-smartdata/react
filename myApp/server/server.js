const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const db = require('./db')

const app = express();
const PORT = 4000;
app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => {
    res.send("Home component!");
});

app.get('/getdata', (req, res) => {
    db.query('SELECT * FROM emp', (err, results) => {
        if (err) {
            console.error("Query failed:", err);
            return res.status(500).send("Error querying the database.");
        }
        res.json(results);

    });
});

app.post('/addData', (req, res, next)=>{
    const {id, name, email, phone, address} = req.body;
 

    const parsedId = parseInt(id);

    const query = `INSERT INTO emp (id, name, email, phone, address) VALUES (${parsedId}, '${name}', '${email}', '${phone}', '${address}')`;
    console.log(id, name, email, phone, address);
    
       
    db.query(query, (err, result)=>{
        if(err){
            console.error('Query Faild: ', err)
            return res.status(500).send('Error querying the database !')
        }
        res.json(result)
    })
})


//filter data 

app.get('/api/users', (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    const sql = `
        SELECT * FROM emp 
        WHERE id LIKE ? OR name LIKE ? OR email LIKE ? OR phone LIKE ? OR address LIKE ?
    `;
    const queryParams = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];

    db.query(sql, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

//update user !


app.put('/api/update/:id', (req,res)=>{
    const { name, email, phone, address } = req.body;
    const id = req.params.id; 
const data = [name, email, phone, address, id];

    db.query('UPDATE emp SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',data, (err, result, fields)=>{
   if(err) throw err;
   res.send(result);
    })


})


//delete entries 

app.delete('/api/delete', (req, res) => {
    const { id, email } = req.body;

    // Check for valid input
    if (!id || !email) {
        return res.status(400).send({ message: 'ID and email are required' });
    }

    const data = [id, email];

    db.query(`DELETE FROM emp WHERE id = ? AND email = ?`, data, (err, result) => {
        if (err) {
            // Log the error for debugging purposes
            console.error('Database error:', err);
            return res.status(500).send({ message: 'Database error', error: err });
        }

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Employee not found' });
        }

        res.send({ message: 'Employee deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}!`);
});
