const productModel = require("../../models/mongoose/Products.Schema.model");
const jwt = require('jsonwebtoken');
const UsersMD = require("../../models/mongoose/Users.schema.model");


const addProductMD = async (req, res) => {
    try{

        const authHeader = req.headers['authorization'];
        const token = authHeader.substring(7);
            jwt.verify(token, 'imaginnovate', async (err, decoded) => {
                const { email } = decoded;
                const user = await UsersMD.findOne({ email });
                console.log(user,"user")
                if (user) {
                    const userId = user._id;
                    let payload = req.body;
                    payload.userId = userId;
                    console.log(payload,"payload")
                    const newProduct = new productModel(payload);
                    const saveProduct = await newProduct.save();
                    console.log(saveProduct,"saved Product");
                }

            })
     

        // res.status(201).json({
        //     success: true,
        //     message: "Product added successfully",
        //     product: saveProduct
        // })

    }catch(err){
        console.log(err);
        // res.status(400).json({
        //     success: false,
        //     message: "Error adding product",
        //     error: err.message
        // })
    }

}



const getProductsMd = async (req, res) => {

    try{

        const products = await productModel.find();
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products: products
        })


    }catch(err){
        console.log(err);
       return  res.status(500).json({
            success: false,
            message: "Error adding product",
            error: err.message
        })
    }

}


module.exports = {addProductMD,getProductsMd}