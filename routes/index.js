const express = require('express');
const router = express.Router();

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

module.exports = router;