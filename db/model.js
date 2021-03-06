const mongoose = require("mongoose");

/*
*   @description: User schema
*/ 

const event = new mongoose.Schema({
    name:String,
    description:String,
    artist:String,
    date:String,
    time:String,
    address:String,
    id:String

});

const schema = new mongoose.Schema({
    name:String,
    passwd:String,
    events:[event],
    cart:[event]
});



/*
*   @description: Artist schema
*/


const booking = new mongoose.Schema({
    user:String,
    description:String,
    date:String,
    time:String,
    address:String
});


const artists = new mongoose.Schema({
    name:String,
    city:String,
    passwd:String,
    type:String,
    bookings:[booking],
    rate:Number,
    location:String,
    rating:Number,
    rated_users:Number

});


const model = mongoose.model("user",schema);
const art = mongoose.model("artist",artists);

module.exports.users = model;
module.exports.artists = art;




