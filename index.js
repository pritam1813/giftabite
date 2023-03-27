const port = 3000;                                      //Port for Running the app
const express = require('express');                     //Importing Express Module for creating APP
const app = express();                                  //Creating the app


//Setting the App to use the routes folder to handle Different Routes
app.use('/', require('./routes/index'));



//Command For Running The App
app.listen(port, () => {console.log(`App Running On Port: ${port}`)});