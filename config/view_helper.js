/* This file is responsible for deciding the path of assets 
depending upon the mode(Production or Development) in which the project runs*/

const path = require('path');
const manifest = require('../public/manifest.json');
const env = require('./environment');

module.exports = (app) => {
    app.locals.getAssetPath = function (filename) {
        if (env.name == 'development') {
            return filename;
        }

        if (manifest[filename]) {
            return path.join('/', manifest[filename]);
        }
        throw new Error(`The file ${filename} is not found in manifest.`);
    }
}