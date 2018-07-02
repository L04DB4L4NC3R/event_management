const router = require("express").Router();
const verify = require("../../helpers/jwt");
const artists = require("../../db/model").artists;
const users = require("../../db/model").users;

/** 
*   @description Search according to name or type
*    
*    {
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
*    {
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
 *              {rate:String, rating:Number}
 *              ]
 */

router.post("/main",(req,res,next)=>{

    if(req.body.rate && req.body.rating){
        var rate =  req.body.rate.split("-");
        var lower = parseInt(rate[0]);
        var upper = parseInt(rate[1]);
    
        artists.find({},{passwd:0})
        .where('rating',req.body.rating)
        .where('rate').gte(lower).lte(upper)
        .exec((err,data)=>{
            if(err) next(err);
            else res.json({data});
        });
    }

    else if(req.body.rate){
        var rate =  req.body.rate.split("-");
        var lower = parseInt(rate[0]);
        var upper = parseInt(rate[1]);
        
        artists.find({},{passwd:0})
        .where('rate').gte(lower).lte(upper)
        .exec((err,data)=>{
            if(err) next(err);
            else res.json({data});
        });
    }

    else if(req.body.rating){
        artists.find({},{passwd:0})
        .where('rating',req.body.rating)
        .exec((err,data)=>{
            if(err) next(err);
            else res.json({data});
        });
    }

    else{
        artists.find({},{passwd:0})
       .then(data=>res.json({data}))
       .catch(err=>next(err));
    }
});





/**
 * @description Cart: from here you can remove and add artists
 * 
 * data: 
 *  {
*   name:String,
*   description:String,
*   artist:String,
*   id:String,
*   date:dd/mm/yy,
*   time:String,
*   address:String
*    } 
 * 
 */

router.post("/cart",verify,async (req,res,next)=>{
    
    var id = req.data.user._id;
    
    var artist = await artists.findOne({name:req.body.artist})

    if(artist){
        for(booking of artist.bookings){   
            if(booking.date === req.body.date && booking.time === req.body.time)
                return next("Artist is booked for the entered date and time");
        }
    
        await users.update({_id:id},{$push:{cart:req.body}});
        //await artists.update({name:req.body.artist},{$push:{bookings:{user:id,description:req.body.description,date:req.body.date,time:req.body.time,address:req.body.address}}});
        return res.json({message:"Artist is added to cart"});
    }
    else 
        next("Artist not found");
});




/**
 * @description View cart
 */

 router.get("/cart",verify,(req,res,next)=>{
    
    var id = req.data.user._id;

    users.findOne({_id:id},{passwd:0})
    .then(data=>res.json({data:data.cart}))
    .catch(err=>next(err));
 
 });







module.exports = router;