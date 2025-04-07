require('dotenv').config({ path: './.env.info' });
const mongoose = require("mongoose");

const mongooseDbConnection = () =>{
    mongoose.connect(process.env.MONGO_END_POINT)
    .then(() => console.log(" mongoose Database connected"))
    .catch(err => console.log(err));
}

mongooseDbConnection();


module.exports = mongooseDbConnection;