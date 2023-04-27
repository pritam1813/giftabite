const User = require('../models/user');                         //Importing user database from models folder
const bcrypt = require('bcrypt');                               //Module to create password hash
const validator = require('deep-email-validator');              //Module For Checking Valid Emails

module.exports.joinus = (req, res) => {
    if(req.isAuthenticated()){                  //isAuthenticated is inbuilt function to check Authentication 
        return res.redirect('/dashboard');          //If user is alredy Authenticated then sign up page is not accessible
    }
    return res.render('JoinUs', { title: 'Giftabite | Join Us' });
}

//Action for Creating/Signing Up a user and storing the Data in the Database
module.exports.signup = async function (req, res) {
    try {

        //Checking For Proper valid Emails using deep-email-validator to prevent spam or fake user
        const validEmail = await validator.validate(req.body.email);
        if(!validEmail.valid){
            return res.json({ error: 'Invalid Email or Email Domain Not Allowed', type: 'InvalidEmail' });
        }

        //If the password and confirm password doesn't match then we will not create user
        if (req.body.password !== req.body.confirm_password) {
            return res.json({ error: 'Passwords do not match', type: 'PasswordMismatch' });
        }

        //Trying to find if the user with same email already exists in the database
        let user = await User.findOne({ email: req.body.email });

        if (!user) { //If User doesn't exist then 
            // Hashing the password using bcrypt
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(req.body.password, salt);

            // Updating only the password field with the hashed value
            req.body.password = passwordHash;

            //Creating the User
            await User.create(req.body);

            return res.json({ success: 'Signed Up successfully please login', type: 'SignupSuccess' });

        } else {
            return res.json({ error: 'User already exists', type: 'UserExist' });
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        return;
    }
};

module.exports.dashboard = async function(req, res){
    try {
        if(!req.isAuthenticated()){
            //If User is not Authenticated then redirect him to Join Us page
            return res.redirect('/join-us');
        }
        return res.render('Dashboard', {title: 'Dashboard'});
    } catch (error) {
        console.log(error);
    }
}

//Action for Logging in a user and creating a Session
module.exports.create_session = function(req, res){

    return res.redirect('/dashboard');
};