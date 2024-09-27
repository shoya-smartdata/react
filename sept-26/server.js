const express = require("express");
const app = express()
const PORT = 4000;


const connection = require('./configDb/db')
const {userRoutes, loginRoute, getDataRoute} = require('./Router/user.router')
 

app.use(express.json()); 

app.use('/app', loginRoute)
app.use('/app', userRoutes);
app.use('/app', getDataRoute)


app.listen(PORT, ()=>{
    console.log(`server is running successfully on port ${PORT}`);
    
})