const port = 3000;                                      //Port for Running the app
const express = require('express');                     //Importing Express Module for creating APP
const sassMiddleware = require('express-dart-sass');    //Middleware for compiling scss
const app = express();                                  //Creating the app

//Syntax for using express dart sass
app.use(sassMiddleware({
    /* Options */
    src: 'assets/scss',
    dest: 'assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix:  '/css'  
}));

//Using middleware express.urlencoded() for POST requests
app.use(express.urlencoded({extended:false}));

app.use(express.static('assets'));                      //Mentioning Path for using the static assets by the app

app.set('view engine', 'pug');                          // Setting default View Engine(required to render html)
app.set('views', './views');                            // Setting views folder to render the pages by view engine


//Setting the App to use the routes folder to handle Different Routes
app.use('/', require('./routes/index'));



//Command For Running The App
app.listen(port, () => {console.log(`App Running On Port: ${port}`)});