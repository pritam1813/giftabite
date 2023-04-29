/* Routes for making different api request within the webapp */

const express = require('express');
const router = express.Router();
const geoNameApi = require('../../controller/api/geoNames');

router.get('/geonames', geoNameApi.geoname);

module.exports = router;