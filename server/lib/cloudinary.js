import {v2 as cloudinary} from "cloudinary"
cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.CLoud_API_KEy,
    api_secret:process.env.CLoud_secret
})
export default cloudinary;