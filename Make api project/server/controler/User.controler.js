const User = require("../model/User.model");
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const UsergetAll = async (req, res) => {
    try {
        const UserData = await User.find();
        res.status(200).json({ UserData })
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
}
const UserGetByid = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "id is required" })
    }
    try {
        const UserData = await User.findById(id);
        const {password,...rest}=UserData._doc
        res.status(200).json({ rest })
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
}
const AddtheUser = async (req, res) => {
    const { username, email, dateOfBirth, location, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }
    if (!username, !email, !dateOfBirth, !location, !password, !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "Email already exists" })
    }
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(500).json({ message: err })
            }
            if (hash) {
                
                const detailsuser = await User.create({ username, email, dateOfBirth,role:"user", location, password: hash });
                var autharization_token = jwt.sign( {username, email, dateOfBirth,role:"user", location, password: hash } , 'asasa');
             return   res.status(201).json({ message: "User created Successfully" ,autharization_token})
            }else{
            return res.status(400).json({ message: "Something went wrong" })
            }
        });
    } catch (error) {
         res.status(500).json({ message: error?.message })

    }
}
const Logintheuser = async (req, res) => {
    const { email, password } = req.body;
    if (!email, !password) {
        return res.status(400).json({ message: "Email and password are required" })
    }
    try {
        const UserExist = await User.findOne({ email })
        if (!UserExist) {
            return res.status(400).json({ message: "User does not exist" })
        }
        bcrypt.compare(password, UserExist.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: err })
            }
            if (result) {
                const { password, ...rest } = UserExist._doc;
                jwt.sign({ rest }, 'asasa', (err, token) => {
                    if (err) {
                        return res.status(500).json({ message: err })
                    }
                    if (token) {
                        return res.status(200).json({ message: "User logged in successfully", token, ...rest })
                    }
                    return res.status(400).json({ message: "Invalid password" })
                });

            }
            else {
                res.status(400).json({ message: "something went wrong" })
            }

        });

    } catch (err) {
        res.status(500).json({ message: err?.message })
    }
}
const UpdatetheUserbyid = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "id is required" })
    }
    try {
        const UserExist = await User.findById(id);
        if (!UserExist) {
            return res.status(400).json({ message: "User does not exist" })
        }
        console.log(req.body)
        await User.findByIdAndUpdate(id,req.body)
        res.status(200).json({ message: "User updated successfully" })
    } catch (error) {

        res.status(400).json({ message: error?.message })
    }
}
const UserDeleteByid=async(req,res)=>{
    const{id}=req.params;
    try {
        const UserExist=await User.findByIdAndDelete(id);
        if(!UserExist){
            return res.status(400).json({message:"User does not exist"})
        }
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        res.status(400).json({ message: error?.message })
        
    }
}
module.exports = { UsergetAll, UserGetByid, AddtheUser, Logintheuser, UpdatetheUserbyid,UserDeleteByid }