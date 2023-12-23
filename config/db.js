const mongoose = require('mongoose');
require('dotenv').config();
user=process.env.MONGOURI

module.exports = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${user}@cluster0.dwnwv8t.mongodb.net`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};
