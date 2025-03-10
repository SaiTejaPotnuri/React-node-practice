const express = require("express");
const router = express.Router();

router.get('/api/home', (req, res) => {
    console.log("home api called", req.url);
    res.send("home api called");
});

module.exports = router;
