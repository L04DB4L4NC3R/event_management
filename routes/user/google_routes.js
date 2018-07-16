const router = require("express").Router();
const jwt = require("jsonwebtoken");
const util=require('util');
const users = require("../../db/model").users;
jwt.sign=util.promisify(jwt.sign);
const passport=require('passport');

require('dotenv').config();




router.get('/google/callback',passport.authenticate('google'),(req,res,next)=>{
    users.findOne({username:req.user.name})
    .then((user)=>{
    //if exists
        if(user){
        //user exists
            jwt.sign({id:user["_id"]},process.env.SECRET_KEY)
            .then((token)=>res.json({token,name:user.name}))
            .catch(next);
    }
        else{
        //create new user
        return new users(req.user).save()
        .then((user)=>{
        //created new user
            console.log(user)
     
            jwt.sign({id:user["_id"]},process.env.SECRET_KEY)
        .then((token)=>res.json({token,name:user.name}))
        .catch(next);
        
        })

        .catch(next);
        }
        })
    .catch(next);

});
router.get('/google',passport.authenticate('google',{
scope:['profile','email']}));


module.exports=router;


