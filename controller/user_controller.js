const User = require('../models/user');

module.exports.joinus = (req, res) => {
    return res.render('JoinUs', { title: 'Giftabite | Join Us' });
}

//Action for Creating/Signing Up a user and storing the Data in the Database
module.exports.signup = async function (req, res) {
    try {
        //If the password and confirm password doesn't match then we will not create user
        if (req.body.password != req.body.confirm_password) {
            return res.json({ error: 'Passwords do not match' });
        }

        //Trying to find if the user with same email already exists in the database
        let user = await User.findOne({ email: req.body.email });

        if (!user) {                                  //If User doesn't exist then creating the User
            await User.create(req.body);
            return res.json({ success: 'Signed Up successfully please login' });
        } else {
            return res.json({ error: 'User already exists' });
        }

    } catch (err) {
        console.log(`Error: ${err}`);
        return;
    }
};