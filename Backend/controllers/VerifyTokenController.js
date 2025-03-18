const pool = require("../utils/db.connection");
const jwt = require('jsonwebtoken');

exports.VarifyTokenController = (req,res) =>{
    res.status(200).json({
        success : true,
        message : "Token is valid",
    })
}

