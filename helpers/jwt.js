const jwt = require("jsonwebtoken");

module.exports = function verify(req,res,next){
    jwt.verify(req.get('Authorization'),process.env.SECRET_KEY,(err,decodedData)=>{
        if(err)
            res.redirect("/user/login");
        else{
            req.data = decodedData;
            next();
        }
    });
}
