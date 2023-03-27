const port = 3000;                                      //Port for Running the app
const express = require('express');                     //Importing Express Module for creating APP
const app = express();                                  //Creating the app


app.use(express.static('assets'));                      //Mentioning Path for using the static assets by the app

app.set('view engine', 'pug');                          // Setting default View Engine(required to render html)
app.set('views', './views');                            // Setting views folder to render the pages by view engine


//Setting the App to use the routes folder to handle Different Routes
app.use('/', require('./routes/index'));



//Command For Running The App
app.listen(port, () => {console.log(`App Running On Port: ${port}`)});