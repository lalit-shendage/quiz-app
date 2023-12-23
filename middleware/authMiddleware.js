const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
key=process.env.JWT_key

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Token missing' });
    }

    const decoded = jwt.verify(token, key);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    }
    req.user = user; 
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
