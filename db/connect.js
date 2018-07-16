const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_url,{useNewUrlParser:true});


mongoose.connection
.once("open",()=>console.log("Connection to mongoDB is open"))
.on("error",(err)=>console.log("Error connecting to mongoDB"));
