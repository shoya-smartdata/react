import express from 'express';
import { register ,login, updateUser } from '../controller/User.controller.js'; 
import { authenticate } from '../Middleware/User.MiddleWare.js'; 
import getUser from '../controller/getuser.js';
import { softDeleteUser } from '../controller/SoftDelete.js';


const userRoute = express.Router();




userRoute.post('/register', register);

userRoute.get('/home',getUser )

userRoute.post("/login", login)

userRoute.put('/update', updateUser)



userRoute.delete('/delete/:id', authenticate, softDeleteUser)

export default userRoute
