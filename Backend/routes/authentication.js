const express = require("express");

const router = express.Router();


router.post('/api/login', (req, res) => {
    const { userName, password } = req.body;
    const token = JSON.stringify(userName);

    if(isValidUser(userName, password)){     
        res.json({ 
            success : true,
            token : token,
            message : "login successfull",
            user : {
                name : userName
            }
        });
    }else{
        res.status(400).json({
            success : false,
            message : "Bad request",
        })
    }

});

let isValidUser = (userName, password) => userName == "testing@yopmail.com" && password == "Test@1234";


module.exports = router;
