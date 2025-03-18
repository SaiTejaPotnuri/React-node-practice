const jwt = require('jsonwebtoken');
const pool = require('../utils/db.connection');

exports.VerifyToken = (req, res, next) => {
    console.log("verify token api called", req.url);
  
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, Please try again"
      });
    }
  
    const token = authHeader.substring(7); // "Bearer ".length === 7
  
    jwt.verify(token, 'imaginnovate', async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid token, Please try again"
        });
      }
  
      const { id, name } = decoded;
      console.log(decoded, "decoded");
      
      if (!id || !name) {
        return res.status(401).json({
          success: false,
          message: "Invalid Details, Please try again"
        });
      }
  
      try {

        const [rows, fields] = await pool.execute("SELECT * FROM users WHERE userId = ?", [id || 0]);
        let user = rows[0];
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Invalid user, Please try again"
          });
        }
  
        // Add user info to req object for use in route handlers
        req.user = user;
        
        // Only call next() if everything is valid
        next();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Server error during authentication"
        });
      }
    });
  };