const jwt = require("jsonwebtoken");
const Auth=(req,res,next)=>{
    const {token}=req.headers;
   var AccessToken =token.split(" ")[1]
    if(!AccessToken){
        return res.status(401).json({message:'Unauthorized'});
    }
    const decoded=jwt.verify(AccessToken,"1221");
    if(decoded){
        next()
    }
}
module.exports=Auth