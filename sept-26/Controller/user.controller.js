
const sequelize = require('../configDb/db');
const User = require('../Model /user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.UserController = async (req, res) => {
  try {
    
   const {username, email, address, password} = req.body;
   const hashedPassword = await bcrypt.hash(password, 10);
     User.create({
      username : username,
      email: email,
      address: address,
      password: hashedPassword

     })

     res.status(201).json({
        mesage: "data successfully created !"
     })
  } catch (error) {
    console.log(error);
    
  }
  } 


  exports.getDataController = async(req, res)=>{

    const token = req.header("Authorization");
    jwt.verify(token, 'assdsdj&%*^54a5s4', async(error,  decoded)=>{
        if(error){
            res.status(401).json({
                error: "error occured !"
            })
        }
        const findUser = await User.findOne({where: {id: decoded.id}})
        if(!findUser){
            return res.send("user not found !")
        }
        const userData = findUser.toJSON()
        delete userData.password;
    
        return res.status(200).json(userData)
    } )
  }
  


