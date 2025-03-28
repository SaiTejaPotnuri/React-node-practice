const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        unique : false,
        minlength : 3,
        maxlength : 50
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        minlength : 3,
        maxlength : 50
    },
    password : {
        type : String,
        required : true,
        trim : true,
        unique : false,
        minlength : 3,
        maxlength : 50
    },
},{
    timestamps : true
})

const UsersMD = mongoose.model("users",UsersSchema);
module.exports = UsersMD;