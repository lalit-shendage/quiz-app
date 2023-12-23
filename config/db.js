const mongoose = require('mongoose');
require('dotenv').config();
user=process.env.mongoURI

module.exports = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${user}@cluster0.dwnwv8t.mongodb.net/quiz_app`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};
