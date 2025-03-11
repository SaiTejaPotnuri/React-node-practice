const validateLoginInput = (req, res, next) => {
    const { userName, password } = req.body;
    
    // Check if userName and password are provided
    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }
    
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userName)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }
    
    // Check password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    
    // If all validations pass, proceed to the next middleware or controller
    console.log("Login attempt:", userName);
    next();
  };



  module.exports = {
    validateLoginInput
  }