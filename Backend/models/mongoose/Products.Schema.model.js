
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        trim : true,
        unique : false,
        minlength : 3,
        maxlength : 50
    },
    imageurl : {
        type : String,
        required : false,
        trim : true,
        unique : false,
    },
    description :{
        type : String,
        required : false,
        trim : true,
        unique : false,
        minlength : 3,
        maxlength : 200
    },
    price : {
        type : Number,
        required : true,
        unique : false,
        min : 0
    },
    isAvailable : {
        type : Boolean,
        required : true,
        unique : false,
        default : false
    },
    seqProductId : {
        type : Number,
        required : true,
        unique : false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // Refers to UsersMD
        required: true,
      },
},
{
    timestamps : true
}
)

//here products is a collection
const productMD = mongoose.model("products", productSchema);

module.exports = productMD;