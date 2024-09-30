const express = require('express');
const app = express();

const connection = require('./database/db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const userRoutes = require('./Routes/userRoutes')


app.use('/api', userRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`your server is running successfully at port ${process.env.PORT}`); 
});