const express = require("express");
const {VerifyToken} = require("../middleware/tokenValidationMiddleWare");
const ProductsController = require("../controllers/ProductsController");
const productMDController = require("../controllers/mongoose/Products.Mongoose.Controller");
const { upload } = require('../config/s3Config');

const router = express.Router();


router.post("/api/products",VerifyToken,upload.single("image"),ProductsController.AddProduct,productMDController.addProductMD);
router.get("/api/all-products",VerifyToken,ProductsController.GetProduct,productMDController.getProductsMd)
router.delete("/api/products/:id",VerifyToken,ProductsController.DeleteProduct,productMDController.deleteProductMD)


module.exports = router;
