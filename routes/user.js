const router = require("express").Router();
const verify = require("../helpers/jwt");
const artists = require("../db/model").artists;
const users = require("../db/model").users;

/*
*   @body: {
*       query:String
*    } 
*/

router.post("/search",verify,(req,res,next)=>{
    
    artists.find({name:req.body.query},{passwd:0,bookings:0})
    .then((data)=>{
        if(data)
            return res.json({data});
        else{
            artists.find({type:req.body.query},{passwd:0,bookings:0})
            .then((data)=>{
                res.json({data});
            }).catch(err=>next(err));
        }
    }).catch(err=>next(err));
});




/*
*   @body: {
*   name:String,
*   description:String,
*   artist:String,
*   id:String,
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


/*
*   @description: removing an event via get request (send singer id via get request)
*/

router.get("/delete/:id",verify,(req,res,next)=>{
    
    users.update({_id:req.data.user._id},{$pull:{events:{id:req.params.id}}})
    .then(()=>{
        
       artists.update({_id:req.params.id},{$pull:{bookings:{user:req.data.user._id}}})
       .then(()=>{
        res.json({message:"Event booking cancelled"});
       }).catch(err=>next(err));

    }).catch(err=>next(err));
});




/**
 *  @description List of artists format-
 * 
 *      data:[
 *              {name:String, etc}
 *              ]
 */

router.get("/main",(req,res,next)=>{
    artists.find({},{passwd:0})
    .then((data)=>{
        res.json({data});
    }).catch(err=>next(err));
});


module.exports = router;