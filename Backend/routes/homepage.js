const express = require("express");
const  HomePageController  = require("../controllers/HomePageController");
const router = express.Router();

router.get('/api/home', HomePageController.HomePage);

module.exports = router;
