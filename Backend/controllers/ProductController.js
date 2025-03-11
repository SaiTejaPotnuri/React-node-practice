exports.HomePage = (req, res) => {
    console.log("home api called", req.url);
    res.send("home api called");
}
