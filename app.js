const express = require("express");
const body_parser = require("body-parser");
const morgan = require("morgan");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const passport=require('passport');
require('./helpers/oauth_config');


require("dotenv").config();

const verify = require("./helpers/jwt");
require("./db/connect");

const app = express();

//passport routes
app.use(passport.initialize());
app.use(passport.session());


app.use(morgan('dev'));

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

//graphql
app.use("/graphql",verify,graphqlHTTP({
    schema,
    graphiql:true
}));

app.get("/",(req,res,next)=>{
    res.json({message:"Welcome"});
});

//routes
app.use("/user",require("./routes/user/user_login"));
app.use("/user",require("./routes/user/user"));
app.use("/user",require("./routes/user/user_functions"));
app.use("/artist",require("./routes/artist/artist_login"));
app.use('/user',require('./routes/user/google_routes'));
app.use('/user',require('./routes/user/facebook_routes'));



app.use(function(err,req,res,next){
res.send({err});
});


app.listen(process.env.PORT || 3000,()=>console.log("Listening on port 3000"));
