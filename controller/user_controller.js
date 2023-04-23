module.exports.joinus = (req,res) => {

    return res.render('JoinUs', {title: 'Giftabite | Join Us'});
}

module.exports.signup = (req, res) => {
    return res.redirect('/');
}