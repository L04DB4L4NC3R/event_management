const router = require("express").Router();
const users = require("../db/model").users;
const jwt = require("jsonwebtoken");
const hash = require("../helpers/hash").hash;
const compare = require("../helpers/hash").compare;
const verify = require("../helpers/jwt");




router.post("/login", async (req,res,next)=>{
    if(req.body.name==="" || req.body.passwd==="")
        next("Empty fields");

    var user = await users.findOne({name:req.body.name});

    compare(req.body.passwd,user.passwd)
    .then((bool)=>{
    
        if(user && bool )
            {
                jwt.sign({user},process.env.SECRET_KEY,(err,token)=>{
                    if(err)
                        next(err)
                    console.log(token);
                    res.json({token:token,name:user.name});
                });
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
                    else
                        res.json({token:token,name:o.name});
                });
            })
            .catch(err=>next(err));

        }).catch(err=>next(err));


    }

});


router.get("/unregister",verify,(req,res,next)=>{
    users.findOneAndRemove({_id:req.data.user._id})
    .then(()=>{
        console.log("User " + req.data.user._id + " has been unregistered");
        res.redirect("/");
    }).catch(err=>next(err));
});



module.exports = router;
