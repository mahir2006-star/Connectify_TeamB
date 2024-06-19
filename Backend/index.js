const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
var cors = require('cors')
var cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});