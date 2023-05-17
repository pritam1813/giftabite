const express = require('express');
const router = express.Router();
const passport = require('passport');                               //Importing passport module
const userController = require('../controller/user_controller');
const requestController = require('../controller/request_controller');

//Dashboard Route
router.get('/', passport.checkAuthentication , userController.dashboard);
router.get('/:id', passport.checkAuthentication , userController.dashboard);

//Create Requests
router.post('/create-requests', requestController.create_req);

//Update User
router.post('/update', passport.checkAuthentication, userController.update);

//Accept Requests
router.get('/accept/:id', passport.checkAuthentication, requestController.acceptreq);

//Delete Requests
router.get('/delete/:id', passport.checkAuthentication, requestController.deletereq);

module.exports = router;