const mongoose=require("mongoose");
const ContactSchema=new mongoose.Schema({
    name: String,
    email: String,
    message: String
})

const contact=mongoose.model("contacts",ContactSchema);
module.exports=contact
