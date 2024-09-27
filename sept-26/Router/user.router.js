const express = require('express');
const {UserController , getDataController} = require('../Controller/user.controller')

const {validateLogin } =require("../Controller/login.controller")
const userRoutes = express.Router();
const loginRoute = express.Router();
const getDataRoute = express.Router();

userRoutes.post('/register', UserController 
);

loginRoute.post('/login',validateLogin  );

getDataRoute.get('/getdata',  getDataController)



module.exports = {
    userRoutes, loginRoute , getDataRoute
};