const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true});


mongoose.connection
.once("open",()=>console.log("Connection to mongoDB is open"))
.on("error",(err)=>console.log("Error connecting to mongoDB"));
