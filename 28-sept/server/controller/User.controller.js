import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Model/User.js'; 
import { authenticate } from '../Middleware/User.MiddleWare.js';

export const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    const token = jwt.sign({ id: user.id }, process.env.Token_key, { expiresIn: '1h' });
    res.status(201).send({ token }); 
  } catch (error) {
    res.status(400).json({
      error: error.message || 'An error occurred during registration',
    });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ id: user.id }, process.env.Token_key, { expiresIn: '1h' });
    res.send({ token ,
      message: "login successfully "
    }); 
  } catch (error) {
    res.status(500).json({
      error: error.message || 'An error occurred during login',
    });
  }
};





export const updateUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (email) user.email = email; // Ensure email is unique if you are updating
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};







