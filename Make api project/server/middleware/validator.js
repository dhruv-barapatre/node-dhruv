const validatorrole=(req,res,next)=>{
    if(req.user.rest.role=="admin") {
        next()
        return;
    }
  return   res.status(400).json( {message:"only admin access do this  "})
}
module.exports=validatorrole