import Message from "../models/message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js"
import {io,userSocketMap} from "../server.js"
export const getUsersForSidebar = async (req,res) =>{
    try{
        const userId=req.user._id;
        const filteredUsers= await User.find({_id:{$ne:userId}}).select("-password");
        const Unseenmessages ={}
        const promises = filteredUsers.map(async (user)=>{
            const message= await Message.find({senderId:user._id,recieverId:userId,seen:false})
             if(message.length > 0)
            {
                Unseenmessages[user._id]=message.length
            }
        })
        await Promise.all(promises);
        res.json({success:true,users:filteredUsers,Unseenmessages})
    }
    catch(error)
    {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

export const getmessages = async (req,res)=>{
    try {
        const {id:selectedUserId} = req.params;
        const myId = req.user._id;
        const message = await Message.find({
            $or: [{senderId:myId,recieverId:selectedUserId},
                {senderId:selectedUserId,recieverId:myId}
            ]
        })
        await Message.updateMany({senderId:selectedUserId,recieverId:myId},{seen:true});
        res.json({success:true,message});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
export const markMessagesSeen = async(req,res)=>{
    try {
        const {id} = req.params
        await Message.findByIdAndUpdate(id,{seen:true});
        res.json({success:true})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

export const sendMessage = async(req,res)=>{
    try {
        const {text,image} = req.body;
        const recieverId = req.params.id;
        const senderId= req.user._id;

        let imageUrl;
        if(image){
            const uploadRespnse = await cloudinary.uploader.upload(image)
            imageUrl=uploadRespnse.secure_url;
        }
        const newMessage = await Message.create({
            senderId,
            recieverId,
            text,
            image: imageurl
        })
        const recieverSocketId=userSocketMap[recieverId]
        if(recieverSocketId){
            io.to(recieverSocketId).emit("New Message",newMessage)
        }
        res.json({suceess:true,newMessage})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
