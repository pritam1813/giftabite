/* For Conneting to MongoDB Database */

//Importing mongoose library
const mongoose = require('mongoose');
//Config file to set the environment either as production or development
const env = require('./environment');

//Defining mongoose to connect to the database
mongoose.set("strictQuery", false);
mongoose.connect(env.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Getting the connected DB
const db = mongoose.connection;

//Handling the error for DB connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB!");
});


//Exporting
module.exports = db;