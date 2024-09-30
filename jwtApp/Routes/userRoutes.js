const express = require('express');

const userRoutes = express.Router();
const register = require('../Controller/userController')

userRoutes.post('/register',register)

module.exports = userRoutes;