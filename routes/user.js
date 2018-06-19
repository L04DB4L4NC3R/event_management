const router = require("express").Router();
const verify = require("../helpers/jwt");
const artists = require("../db/model").artists;
const users = require("../db/model").users;

/*
*   @body: {
*       name:String,
*       type:String
*    } 
*/

router.post("/search",verify,(req,res,next)=>{
    
    artists.find({name:req.body.name,type:req.body.type})
    .then((data)=>{
        res.json({data});
    }).catch(err=>next(err));
});




/*
*   @body: {
*   name:String,
*   description:String,
*   artist:String,
*   date:dd/mm/yy,
*   time:String,
*   address:String
*    } 
*/

router.post("/book",verify,async (req,res,next)=>{
  
    var id = req.data.user._id;
    
    var artist = await artists.findOne({name:req.body.artist})

    if(artist){
        for(booking of artist.bookings){   
            if(booking.date === req.body.date && booking.time === req.body.time)
                return next("Artist is booked for the entered date and time");
        }

        await users.update({_id:id},{$push:{events:req.body}});
        await artists.update({name:req.body.artist},{$push:{bookings:{user:id,description:req.body.description,date:req.body.date,time:req.body.time,address:req.body.address}}});
        return res.json({message:"Event is booked"});
    }
    else 
        next("Artist not found");
    
});

module.exports = router;