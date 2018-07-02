const router = require("express").Router();
const verify = require("../../helpers/jwt");
const artists = require("../../db/model").artists;
const users = require("../../db/model").users;




/**
 * 
 * @description rate artists 
 * 
 * {
 *      id: String,
 *      rating: Number
 * }
 * 
 */



 router.post("/rate", (req,res,next)=>{
    
    artists.findOne({_id:req.body.id},{passwd:0})
    .then(async (artist)=>{
       
        var rating = ( (artist.rating*artist.rated_users) + req.body.rating )/(artist.rated_users+1);
        artist.rating = Math.round(rating);
        artist.rated_users++;
        await artist.save();
        res.json({rating:Math.ceil(rating)});
    }).catch(err=>next(err));

 });



 /**
  * @description Search according to city
  * 
  * {
  *     city:String
  * }
  */

  router.get("/search/:city",(req,res,next)=>{
      artists.find({city:req.params.city},{passwd:0,bookings:0})
      .then((c)=>{
          res.json({data:c});
      }).catch(err=>next(err));
  });

 module.exports = router;