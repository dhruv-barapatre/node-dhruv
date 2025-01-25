const Usermodel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name, !email, !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    const UserExist = await Usermodel.findOne({ email });
    if (UserExist) {
        return res.status(400).json({ message: "Email already exists" });
    }
    try {
        bcrypt.hash(password, 5, (err, hash) => {
            if (err) {
                return res.status(400).json({ message: "Error hashing password" });
            }
            if (hash) {
                const User = Usermodel.create({ email, name, password: hash });
                res.status(200).json({ message: "User Created Successfully." })
            }
        });
    } catch (error) {
        return res.status(400).json({ message: error?.message });
    }
}

const Login = async(req, res) => {
    const { email, password } = req.body;
    if (!email, !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    const User =await  Usermodel.findOne({email});
    if (!User) {
        return res.status(400).json({ message: "Email does not exist" });
    }
    try {
        bcrypt.compare(password, User.password, (err, result) => {
        if(err){
            return res.status(400).json({ message: "Error comparing password" });
        }
        if(result){
            const {password,...rest}=User._doc;
            const token = jwt.sign(rest, "1221")
            return res.status(200).json({ message: "User logged in successfully", token })
        }
        res.status(400).json({message:"Password is incorrect"})
        })
        
    } catch (error) {
        return res.status(400).json({ message: error?.message });
    }
}

module.exports = { register, Login }