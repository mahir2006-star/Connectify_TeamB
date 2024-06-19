const mongoose = require('mongoose');
require('dotenv').config();
const username = encodeURIComponent("node");
const password = encodeURIComponent("connectifyUser!");
const uri = `mongodb+srv://${username}:${password}@userdata.j5qex0n.mongodb.net/userdata?retryWrites=true&w=majority&appName=Userdata`;
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;