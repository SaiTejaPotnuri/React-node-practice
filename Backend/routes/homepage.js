const express = require("express");
const  ProductController  = require("../controllers/ProductController");
const router = express.Router();

router.get('/api/home', ProductController.HomePage);

module.exports = router;
