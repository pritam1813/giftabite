require('dotenv').config();

// For Development build
const development = {
    name: 'development',
    port: 3000,
    asset_path: 'assets/'
};

//For Production build
const production = {
    name: 'production',
    port: process.env.PORT,
    asset_path: 'public/'
};


let environment;
//Setting the environment as per NODE_ENV
if (process.env.NODE_ENV === 'production') {
    
    environment = production;
} else {
    environment = development;
}

module.exports = environment;
