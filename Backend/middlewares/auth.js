const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json({ message: 'Authentication required',status:0 });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user){
      return res.json({ message: 'User not found',status:0 });
    }
    req.user = user;
    next();
  }catch (error){
    res.json({ message: 'Invalid token',status:0 });
  }
};
module.exports = { authenticate };
