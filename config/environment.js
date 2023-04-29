require('dotenv').config();

// For Development build
const development = {
    name: 'development',
    port: 3000,
    asset_path: 'assets/',
    mongodb_uri: 'mongodb://127.0.0.1:27017/giftabite',
    session_cookie_key: 'giftabitetestKey',
    geoname_id: '1269750', //Geoname ID For India
    geonames_username: 'giftabitetest'
};

//For Production build
const production = {
    name: 'production',
    port: process.env.PORT,
    asset_path: 'public/',
    mongodb_uri: process.env.MONGODB_URI,
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
    geoname_id: process.env.GEONAME_ID,
    geonames_username: process.env.GEONAMES_USERNAME
};


let environment;
//Setting the environment as per NODE_ENV
if (process.env.NODE_ENV === 'production') {
    
    environment = production;
} else {
    environment = development;
}

module.exports = environment;
