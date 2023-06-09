const env = require('./config/environment');            //Config file to set the environment either as production or development
const express = require('express');                     //Importing Express Module for creating APP
const cookieParser = require('cookie-parser');                                  //Importing cookie parser module for managing cookies 
const sassMiddleware = require('express-dart-sass');    //Middleware for compiling scss
const app = express();                                  //Creating Express app
require('./config/view_helper')(app);                   //For appending dynimic asset path to the views
const path = require('path');                           //Module For referencing to path
const db = require('./config/mongoose');                //Importing the Database
const session = require('express-session');             //Library for creating Session and storing encrypted Session ID
const MongoStore = require('connect-mongo');            //required fo storing the session cookie
const passport = require('passport');                                           //Importing passport js library
const passportLocal = require('./config/passport-local');                       //Passport local strategy from config folder

if (env.name === 'development') {
    //Syntax for using express dart sass
    app.use(sassMiddleware({
        /* Options */
        src: 'assets/scss',
        dest: 'assets/css',
        debug: true,
        outputStyle: 'expanded',
        prefix: '/css'
    }));
}

//Using middleware express.urlencoded() for POST requests
app.use(express.urlencoded({ extended: false }));

//Telling the app to use Cookie Parser
app.use(cookieParser());

//Mentioning Paths for using the static assets by the app
app.use(express.static(env.asset_path));                 
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));


app.set('view engine', 'pug');                          // Setting default View Engine(required to render html)
app.set('views', './views');                            // Setting views folder to render the pages by view engine

/* Cookie Sessions */
//Defining session and cookie properties
app.use(session({
    name: 'Giftabite',
    secret: env.session_cookie_key,                //used to encrypt the cookie
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100),              //cookie expires after this time
    },
    store: MongoStore.create({                  //Storing the session cookie in the database
        mongoUrl: env.mongodb_uri       
    })
}));

app.use(passport.initialize());     //middle-ware that initialises Passport
app.use(passport.session());        /* acts as a middleware to alter the req object and change the 'user' value that is currently 
                                    the session id (from the client cookie) into the true deserialized user object.*/

app.use(passport.setAuthentication);

//Setting the App to use the routes folder to handle Different Routes
app.use('/', require('./routes'));


//Command For Running The App
const server = app.listen(env.port, () => { console.log(`App Running in ${env.name} Mode, On Port: ${env.port}`) });


module.exports = server;