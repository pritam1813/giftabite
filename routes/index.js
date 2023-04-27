const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

router.use('/join-us', require('./users'));
router.get('/', (req, res) => {
    return res.render('Home',{
        title: "Giftabite | Home"
    });
});

router.get('/about-us', (req, res) => {
    return res.render('AboutUs',{
        title: "Giftabite | About Us"
    });
});

router.get('/dashboard', userController.dashboard);

//For undefined Routes/404 error (KEEPING IT AT THE END OF ALL ROUTES)
router.use((req, res, next) => {
    res.status(404).render('404', { title: "404 Error"});
});

module.exports = router;