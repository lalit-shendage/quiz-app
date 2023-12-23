const mongoose = require('mongoose');
require('dotenv').config();
user=process.env.mongoURI

module.exports = async () => {
  try {
    await mongoose.connect(`${user}`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};
