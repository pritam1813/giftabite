const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');
const passport = require('../config/passport-local');

//Using Passport as mddleware to authenticate
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect: '/join-us'},       //If authentication fail then redirect to login page
),userController.create_session);           // If successful then this action gets called

router.get('/', userController.joinus);

router.post('/signup', userController.signup);
router.get('/logout', userController.destroySession);

module.exports = router;