const express = require("express");
const { AuthController}  = require("../controllers/AuthController");
const  { validateLoginInput }  = require("../middleware/authMiddleWare")
const { VarifyTokenController} = require("../controllers/VerifyTokenController");
const { VerifyToken } = require("../middleware/tokenValidationMiddleWare");


const router = express.Router();

/*here we use middleware validateLoginInput to check the userdetails is valid or not and until it clears then only authController
   will be executed , middlewares are used to add gateway before the service bussiness logic should touch  */

router.post('/api/login',validateLoginInput,AuthController);

router.get("/api/verify-token",VerifyToken,VarifyTokenController);

module.exports = router;
