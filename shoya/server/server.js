const express = require('express');
const app = express();
const PORT = 4000;


app.get('/',(req, res)=>{
    res.send("your app is running !")
})


app.listen(PORT, ()=>{
    console.log(`your app is running successFully ! ${PORT}`);
    
})