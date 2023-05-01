const User = require('../models/user');                         //Importing user database from models folder
const Request = require('../models/request');                   //Importing Reequests database from models folder

module.exports.create_req = async function(req, res){
    try {
        let user = await User.findById(req.user.id);

        if(user){
            //If user found then creating a request
            //setting the addresstype first. Delivery address for request created by NGO, and pickup for others
            const addressType = user.registerAs === 'NGO' ? 'delivery' : 'pickup';

            let request = await Request.create({
                requestedBy: req.user,
                quantity: req.body.quantity,
                address: req.body.address,
                addressType: addressType
            });

            //Once the request is created then updating the user DB's requests field with this request
            user.requests.push(request);
            await user.save();

            //Also populating the name of the user in the request DB
            request = await request.populate('requestedBy', 'name');

            return res.redirect('back');
        } else {
            console.log("User Not Found");
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.activereq = async function(req, res){
    try {
        let requests = await Request.find({})
        .sort('-createdAt')
        .populate('requestedBy');
        
        return res.render('ActiveRequests', { 
            title: 'Active Requests',
            all_requests: requests
        });
    } catch (error) {
        console.log(error);
    }
}