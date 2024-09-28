import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connection from './config/db.js'; 
import userRoute from './Routes/User.route.js'; 
import cors from 'cors'


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())


app.use(bodyParser.json());


app.use('/api', userRoute);


app.listen(PORT, () => {
    console.log(`Your app is running successfully on port ${PORT}`);
});
