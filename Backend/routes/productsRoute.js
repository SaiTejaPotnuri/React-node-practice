const express = require("express");
const {VerifyToken} = require("../middleware/tokenValidationMiddleWare");
const ProductsController = require("../controllers/ProductsController");

const router = express.Router();


router.post("/api/products",VerifyToken,ProductsController.AddProduct)
router.get("/api/all-products",VerifyToken,ProductsController.GetProduct)
router.delete("/api/products/:id",VerifyToken,ProductsController.DeleteProduct)


module.exports = router;
