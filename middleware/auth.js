const jwt = require("jsonwebtoken");
const User = require('../models/UserModel');

const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.SECRET_KEY;
  
function auth(req, res, next) {
  // Get the token from the request headers
  try {
    const authHeader = req.header('Authorization');

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, secretKey, async (err, decodedToken) => {
        if (err) {
          return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }

        // Fetch the user details
        const user = await User.findById(decodedToken.userId);

        if (!user) {
          return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

        // Attach the user object to the request
        req.user = user;

        next();
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  
  
}

module.exports = auth;
