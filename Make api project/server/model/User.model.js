const mongoose=require("mongoose");
const Userschema=new mongoose.Schema({
    username: { type: String, required: true  },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: false },
    role: { type: String, required: false, default:"user"},
    location: { type: String, required: true },
    password: { type: String, required: true },
})
const User=mongoose.model('Users',Userschema);
module.exports=User

