/* Responsible for Authentication using passport local library */

/*Imports*/
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; //passport-local is used for local Authentication
const User = require('../models/user');                   //Import User schema
const bcrypt = require('bcrypt');                         //Module for hashing passwords


//Strategy for local authentication
passport.use(new LocalStrategy(
    {
        usernameField: 'email',     //Passing the email as username
        passReqToCallback: true     //req is passed as the first argument to the verify callback
    },

    async function (req, email, password, done) {        //req recieved from passReqToCallback (It is required to display flash messages)
        try {
            const user = await User.findOne({ email: email });
            if (!user) {                                          //If user is not found
                console.log('error Invalid Username/Password');    //Diplay error flash on unsuccessful attempt
                return done(null, false);
            }
            //Using bcrypt to compare the user's password and password stored in database
            const match = await bcrypt.compare(password, user.password);

            if (!match) {                      // If the password doesn't match
                console.log('error Invalid Password');
                return done(null, false);
            }

            return done(null, user); // else part i.e. when user is found

        } catch (error) {
            console.log(error);
        }
    }
));


/* Serialize Function (To store only the required fields into the cookie i.e. User.id).
Determines which data of the user object should be stored in the session. */
passport.serializeUser(function (user, done) {
    done(null, user.id);    // done function is used to encrypt and store only the specified key(user.id) into the cookie
});


/*Deserialize Function (When cookie is sent to the server, the User.id field is extracted)
The first argument of deserializeUser corresponds to the key of the user object that was given to the done function. 
So the whole object is retrieved with help of that key. That key here is the user id */
passport.deserializeUser(async function (id, done) {
    const user = await User.findById(id);
    return done(null, user);  //Returning the user as user is found
});

/* Authentication Properties */

// Function to check Authentication
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {            //If the user is authenticated then sending/allowing user to the next page
        return next();
    }

    return res.redirect('/join-us');   //If user is not authenticated then redirecting user to login page
}

// Funtion to set Authenticated views for the user
passport.setAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;     //req.user contains current authenticated user from the session cookie;
    }                                 //transfering it to passport locals for the views

    next();
}

module.exports = passport;