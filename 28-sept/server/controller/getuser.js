

import User from '../Model/User.js';
import { Op } from 'sequelize';





const getUser = async (req, res) => {
    const { page = 1, limit = 6, search = '', sort = 'id', order = 'ASC' } = req.query;

    try {
        
        const users = await User.findAll(); 

        res.json({
            total: users.length, 
            users: users 
        });
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};


export default getUser