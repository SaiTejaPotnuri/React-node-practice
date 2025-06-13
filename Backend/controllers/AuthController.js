
const bcrypt = require('bcrypt');
const pool = require("../utils/db.connection");
const jwt = require('jsonwebtoken');
exports.AuthController = async (req, res) => {
    const { userName, password } = req.body;
        
        let [rows,fields] = await pool.execute("select * from users where email = ?",[userName]);
        let user = rows[0]

       if(!user){
       return  res.status(400).json({ 
            success : false,
            message : "Bad request",
        })
       }


      const passwordMatch = await bcrypt.compare(password, user.password);
    
       if(!passwordMatch){
        return res.status(400).json({
            success : false,
            message : "Invalid password , Please try again",
        })
       }
       const token = jwt.sign({ id: user.id,name : user.name,email:user.email }, "imaginnovate", { expiresIn: '1h' });
        return res.status(200).json({ 
            success : true,
            token : token,
            message : "logged in  successfully",
            user : {
                id : user.id,
                name : user.email
            }
        });
    
}

