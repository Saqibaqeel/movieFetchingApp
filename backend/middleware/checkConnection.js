const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();



const checkConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ msg: 'Database not connected' });
  }
  console.log('Database connected');
  next();
};

module.exports = checkConnection;
