//User signup function 
import bcrypt from "bcryptjs"
import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req,res)=>{
    const {fullName,email,password,bio}=req.body;
    try{
        if(!fullName|| !email || !password|| !bio)
            return res.json({success:false,meassage:"Missing Details"})
        const user=await User.findOne({email});
        if(user)
            return res.json({success:false,message:"Account already exist"})
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const newUser = await User.create({fullName,email,password:hashedPassword,bio});

        const token = generateToken(newUser._id)
        res.json({success:true, userdata: newUser, token, massage: "Account created Successfully"}
        )
    }
    catch(error){
        console.log(error.meassage);
        res.json({success : false, message : error.message})
    }
}


export const login = async (req,res)=>{
    try
    {
    const {email,password}=req.body;
    const user=await User.findOne({email})

    const ispasswordcorrect = await bcrypt.compare(password,user.password);
    if(!ispasswordcorrect)
        return res.json({success:false,message:"Invalid login credentials"})
     const token = generateToken(newUser._id)
        return res.json({success:true, user, token, massage: "Login Successfull"})
    }
    catch(error)
    {
        console.log(error.message)
        return res.json({success:false,message:error.meassage})
    }
}

export const checkAuth = (req,res)=>{
    return res.json({success:true,user:req.user})
}



export const updateProfile = async (req,res) =>{
    try{
        const {profilePic,bio,fullName}=req.body;

        const userId=req.user._id

        let updatedUser;
        if(!profilePic)
        {
            updatedUser=await User.findByIdAndUpdate(userId,{bio,fullName},{new:true});
        }
        else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullName},{new:true})
        }
        res.json({success: true, user: updatedUser});
    }
    catch(error){
        console.log(error.message);
        res.json({success: false, user: error.message});
    }
}