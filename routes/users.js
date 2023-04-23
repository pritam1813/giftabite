const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

router.get('/', userController.joinus);

router.post('/signup', userController.signup);

module.exports = router;