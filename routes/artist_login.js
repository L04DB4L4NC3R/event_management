const router = require("express").Router();
const users = require("../db/model").users;
const artists = require("../db/model").artists;
const jwt = require("jsonwebtoken");
const hash = require("../helpers/hash").hash;
const compare = require("../helpers/hash").compare;
const verify = require("../helpers/jwt");



router.post("/login", async (req,res,next)=>{
    if(req.body.name==="" || req.body.passwd==="")
        next("Empty fields");

    var artist = await artists.findOne({name:req.body.name});

    compare(req.body.passwd,artist.passwd)
    .then((bool)=>{
    
        if(artist && bool )
            {
                jwt.sign({artist},process.env.SECRET_KEY,(err,token)=>{
                    if(err)
                        next(err)
                    console.log(token);
                    res.json({token:token,name:artist.name});
                });
            }
        else
            next("name or password entered is wrong, please try again");
    }).catch(err=>next(err));

        
    });








    router.post("/signup",async (req,res,next)=>{

        if(req.body.name==="" || req.body.passwd==="")
            next("Empty fields");
    
        var artist = await artists.findOne({name:req.body.name});
    
        if(artist){
            next("artist already exists");
        }

        else{
            hash(req.body.passwd)
            .then((h)=>{

                var obj = new artists({
                    name:req.body.name,
                    passwd:h,
                    bookings:[]
                });
               
                obj.save()
                .then((o)=>{
                    jwt.sign({artist:o},process.env.SECRET_KEY,{expiresIn:"2d"},(err,token)=>{
                        console.log(token)
                        if(err)
                            next(err)
                        
                        return res.json({token:token,name:o.name});
                    });
                })
                .catch(err=>next(err));

            }).catch(err=>next(err));


        }

    });


router.get("/main",verify,(req,res,next)=>{
   artists.findOne({_id:req.data.artist._id})
   .then((artist)=>{
       if(artist)
           res.json({bookings:artist.bookings});     
       else
            next("Artist not found");
    }).catch(err=>next(err));
});


module.exports = router;
