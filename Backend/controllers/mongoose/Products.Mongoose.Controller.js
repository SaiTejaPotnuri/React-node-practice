const productModel = require("../../models/mongoose/Products.Schema.model");
const jwt = require("jsonwebtoken");
const UsersMD = require("../../models/mongoose/Users.schema.model");

const addProductMD = async (req, res) => {
  try {
    const user = await UsersMD.findOne({ email: req.user.email });
    if (user) {
      const userId = user._id;
      let payload = req.body;
      payload.userId = userId;
      const newProduct = new productModel(payload);
      const saveProduct = await newProduct.save();
    }

    // res.status(201).json({
    //     success: true,
    //     message: "Product added successfully",
    //     product: saveProduct
    // })
  } catch (err) {
    console.log(err);
    // res.status(400).json({
    //     success: false,
    //     message: "Error adding product",
    //     error: err.message
    // })
  }
};

const getProductsMd = async (req, res) => {
  try {
    const userInfo = await UsersMD.find({
      email: req.user.email,
    });
    const products = await productModel.find({
      userId: userInfo[0]._id,
    });
    // return res.status(200).json({
    //     success: true,
    //     message: "Products fetched successfully",
    //     products: products
    // })
  } catch (err) {
    console.log(err);
    //    return  res.status(500).json({
    //         success: false,
    //         message: "Error adding product",
    //         error: err.message
    //     })
  }
};

const deleteProductMD = async (req, res) => {
  try {
    const respone = await productModel.deleteOne({
      seqProductId: req.params.id,
    });
    console.log(respone, "respone");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addProductMD, getProductsMd, deleteProductMD };
