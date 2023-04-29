const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

//Registration/Login Route
router.use('/join-us', require('./users'));

//api call route
router.use('/api', require('./api/index'));

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

router.get('/dashboard', userController.dashboard);

//For undefined Routes/404 error (KEEPING IT AT THE END OF ALL ROUTES)
router.use((req, res, next) => {
    res.status(404).render('404', { title: "404 Error"});
});

module.exports = router;