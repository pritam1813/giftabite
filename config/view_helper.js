/* This file is responsible for deciding the path of assets 
depending upon the mode(Production or Development) in which the project runs*/

const path = require('path');
const manifest = require('../public/manifest.json');
const env = require('./environment');
require('dotenv').config();
const assetsUrl = process.env.CUSTOM_STATIC_ASSETS_URL;

module.exports = (app) => {
    app.locals.getAssetPath = function (filename) {
        if (env.name == 'development') {
            return filename;
        }

        if (manifest[filename]) {
            const assetPath = manifest[filename];
            return `${assetsUrl}${path.join('/', assetPath)}`;
        }

        throw new Error(`The file ${filename} is not found in manifest.`);
    }
}