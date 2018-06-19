const router = require("express").Router();
const users = require("../db/model");
const jwt = require("jsonwebtoken");
const hash = require("../helpers/hash").hash;
const compare = require("../helpers/hash").compare;




router.post("/login", async (req,res,next)=>{
    if(req.body.name==="" || req.body.passwd==="")
        res.send("Empty fields")
    var user = await users.findOne({name:req.body.name});

    compare(req.body.passwd,user.passwd)
    .then((bool)=>{
        if(user && bool )
            {
                jwt.sign({user},process.env.SECRET_KEY,(err,token)=>{
                    if(err)
                        next(err)
                    req.session.name = user.name;
                    res.json({token:token,name:req.session.name});
                })
            }
        else
            next("name or password entered is wrong, please try again");
    }).catch(err=>next(err));

        
    });








    router.post("/signup",async (req,res,next)=>{

        if(req.body.name==="" || req.body.passwd==="")
            next("Empty fields");
    
        var user = await users.findOne({name:req.body.name});
    
        if(user){
            next("user already exists");
        }

        else{
            hash(req.body.passwd)
            .then((h)=>{

                var obj = new users({
                    name:req.body.name,
                    passwd:h,
                    events:[]
                });
               
                obj.save()
                .then((o)=>{
                    jwt.sign({user:o},process.env.SECRET_KEY,{expiresIn:"2d"},(err,token)=>{
                        if(err)
                            next(err)
                        req.session.name = o.name;
                        res.json({token:token,name:req.session.name});
                    });
                })
                .catch(err=>next(err));

            }).catch(err=>next(err));


        }

    });




module.exports = router;
