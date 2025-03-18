const authRoute = require("./authentication")
const homeRoute = require("./homepage");
const productsRoute = require("./productsRoute");


module.exports = [
    authRoute,
    homeRoute,
    productsRoute
]