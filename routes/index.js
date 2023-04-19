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


//For undefined Routes/404 error (KEEPING IT AT THE END OF ALL ROUTES)
router.use((req, res, next) => {
    res.status(404).render('404', { title: "404 Error"});
});

module.exports = router;