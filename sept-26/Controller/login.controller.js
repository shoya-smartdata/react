const bcrypt = require("bcrypt")
const User = require('../Model /user.model')
const jwt = require('jsonwebtoken')
exports.validateLogin = async (req, res)=>{
    const {email, password} = req.body


    try {
        const user = await User.findOne({ where: { email } });
        if(!user){
            return res.status(400).json({
                message: "user not found !"
            })
        }
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({
                    message: "invalid password !"
                })
            }
            const userData = user.toJSON()
           delete userData.password
            const token = await jwt.sign(userData, "assdsdj&%*^54a5s4")
           
            console.log(token);
         
            
               res.status(200).json({
                "message": "successfully logged in !"
               })
        
    } catch (error) {
        console.log(error, "somthing error !");
        res.status(500).json({
            error: "internal server errorr !"
        })
        
    }
}



