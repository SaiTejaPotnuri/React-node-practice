const pool = require("../utils/db.connection");
const jwt = require('jsonwebtoken');

exports.VarifyTokenController = (req,res) =>{
    console.log("verify token api called", req.url);

    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // "Bearer ".length === 7

        jwt.verify(token, 'imaginnovate', async (err, decoded) => {
            if (err) {
                res.json({
                    success : false,
                    message : "Invalid token , Please try again",
                })
            } else {
                const {id , name} = decoded;
                console.log(decoded,"decoded")
                if(!id || !name){
                    res.json({
                        success : false,
                        message : "Invalid Details , Please try again",
                    })
                }

                const [rows,fields] = await pool.execute("select * from users where userId = ?",[id || 0]);
                let user = rows[0]

                if(!user){
                    res.json({
                        success : false,
                        message : "Invalid user , Please try again",
                    })
                }


                res.json({
                    success : true,
                    message : "Token is valid",
                })

            }
        });
 
        
      } else {

        res.json({
            success : false,
            message : "Invalid token , Please try again",
        })
      }


}

