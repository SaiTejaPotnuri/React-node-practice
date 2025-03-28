const mongoose = require("mongoose");


const mongooseDbConnection = () =>{
    mongoose.connect("mongodb://localhost:27017/admin")
    .then(() => console.log(" mongoose Database connected"))
    .catch(err => console.log(err));
}

mongooseDbConnection();


module.exports = mongooseDbConnection;