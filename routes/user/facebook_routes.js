const router = require("express").Router();
const jwt = require("jsonwebtoken");
const util=require('util');
const users = require("../../db/model").users;
jwt.sign=util.promisify(jwt.sign);
const passport=require('passport');

require('dotenv').config();

router.get('/facebook/callback',passport.authenticate('facebook'),(req,res,next)=>{
    // console.log(req.user);
    users.findOne({username:req.user.name})
    .then((user)=>{
        console.log(user);
    //if exists
        if(user){
        //user exists
            jwt.sign({id:user["_id"]},process.env.SECRET_KEY)
            .then((token)=>res.json({token,name:user.name}))
            .catch(console.log);
    }
        else{
        //create new user
        return new users(req.user).save()
        .then((user)=>{
        //created new user
         console.log(user);
            // console.log(user)
      //signing of user
        jwt.sign({id:user["_id"]},process.env.SECRET_KEY)
        .then((token)=>res.json({token,name:user.name}))
        .catch(console.log);
        
        })

        .catch(console.log);
        }
        })
    .catch(console.log);

});

router.get('/facebook',passport.authenticate('facebook'));
    
    
    module.exports=router;
