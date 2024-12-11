const jwt = require('jsonwebtoken');
const { UserModel }= require('../../database/models'); // Adjust the path based on your structure
const { JWT_SECRET } = require('../../config'); // Your secret from config or environment variables

// Middleware to authenticate using JWT
const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      const user = await UserModel.findById(decoded.id);
      if (!user) {
          return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateJWT;
