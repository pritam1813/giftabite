const fetch = require('node-fetch');                  //fetch api for making restapi requests
const env = require('../../config/environment');

module.exports.geoname = async function (req, res) {
    try {
        let { geonameId } = req.query;
        const username = env.geonames_username;

        //Checking if GeonameId is present in the query params or not. 
        //If not then changing the id to country id to list the states
        if (!geonameId) {
          geonameId = env.geoname_id;
        }
      
        const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${geonameId}&username=${username}`);
        const data = await response.json();
      
        //Mapping the required returned object to an seperate array
        const geoData = data.geonames.map(item => ({
          name: item.name,
          geonameId: item.geonameId
        }));
      
        //returning the new array as json
        return res.json(geoData);

    } catch (error) {
        console.log(error);
    }
}