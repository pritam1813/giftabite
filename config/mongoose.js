/* For Conneting to MongoDB Database */

//Importing mongoose library
const mongoose = require('mongoose');
//Config file to set the environment either as production or development
const env = require('./environment');

//Defining mongoose to connect to the database
mongoose.set("strictQuery", false);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error('Connection error:', error);
  }
};

connectToDatabase();

module.exports = { mongoose, connectToDatabase };