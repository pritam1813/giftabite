const express = require('express');
const router = express.Router();
const requestController = require('../controller/request_controller');

//Registration/Login Route
router.use('/join-us', require('./users'));

//Root Route/Homepage
router.get('/', (req, res) => {
    return res.render('Home',{
        title: "Giftabite | Home"
    });
});

//About Us Route
router.get('/about-us', (req, res) => {
    return res.render('AboutUs',{
        title: "Giftabite | About Us"
    });
});

//Active Requests
router.get('/activereq', requestController.activereq);

//Dashboard Route
router.use('/dashboard', require('./dashboard'));

//For undefined Routes/404 error (KEEPING IT AT THE END OF ALL ROUTES)
router.use((req, res, next) => {
    res.status(404).render('404', { title: "404 Error"});
});

module.exports = router;