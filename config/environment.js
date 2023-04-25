require('dotenv').config();

// For Development build
const development = {
    name: 'development',
    port: 3000,
    asset_path: 'assets/',
    mongodb_uri: 'mongodb://127.0.0.1:27017/giftabite',
    session_cookie_key: 'giftabitetestKey'
};

//For Production build
const production = {
    name: 'production',
    port: process.env.PORT,
    asset_path: 'public/',
    mongodb_uri: process.env.MONGODB_URI,
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
};


let environment;
//Setting the environment as per NODE_ENV
if (process.env.NODE_ENV === 'production') {
    
    environment = production;
} else {
    environment = development;
}

module.exports = environment;
