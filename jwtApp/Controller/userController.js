const User = require('../models/userModel.js');
const bcrypt = require('bcrypt'); 

 const register = async (req, res) => {
  try {
    
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); 


    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword, 
    });

  
    res.status(201).json({
      message: "User registered successfully",
      user: {
        email: newUser.email, 
      },
    });
  } catch (error) {
    console.error(error);

  
    res.status(500).json({
      error: "Server error!",
    });
  }
};


module.exports = register;