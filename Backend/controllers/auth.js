const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = password;
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ message: 'Registration successful',status:1 });
  } catch (error) {
    res.json({ message: 'Error',status:0 });
  }
};
const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message:'User not found',status:0 });
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.json({ message:'Password does not match',status:0 });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY,{});
    res.cookie('jwt',token,{
      path: "/", // Cookie is accessible from all paths
      secure: false, // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: "Strict",
      expires:new Date(Date.now() + 900000)
    });
    res.json({token:token,status:1});
  } catch (error) {
    res.json({ message: 'Error',status:0 });
  }
};
const logout = async (req, res, next) => {
    try{
    res.clearCookie("jwt");
    res.json({ message: 'Logout successful',status:1 });
    }catch(error){
      res.json({ message: 'Error',status:0 });
    }
};
module.exports = { register, login,logout };
