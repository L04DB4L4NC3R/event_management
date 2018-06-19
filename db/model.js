const mongoose = require("mongoose");

const event = new mongoose.Schema({
    name:String,
    description:String,
    artist:String,
    date:{
        type:Date,
        default:Date.now()
    },
    time:String,
    pending:Boolean

});

const schema = new mongoose.Schema({
    name:String,
    passwd:String,
    events:[event]
});



const model = mongoose.model("user",schema);

module.exports = model;
