const express = require("express");
const body_parser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
require("./db/connect");

const app = express();

app.use(morgan('dev'));
//app.set("view engine","ejs");
//app.use(express.static('public'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

app.get("/",(req,res,next)=>{
    res.json({message:"Welcome"});
});

//routes
app.use("/user",require("./routes/user_login"));
app.use("/user",require("./routes/user"));
app.use("/artist",require("./routes/artist_login"));

app.use(function(err,req,res,next){
    res.send({err});
});

app.listen(process.env.PORT || 3000,()=>console.log("Listening on port 3000"));
