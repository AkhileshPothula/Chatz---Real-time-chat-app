import jwt from "jsonwebtoken"

export const generateToken= (userId)=>{
    const toke=jwt.sign({userId}, process.env.secret);
    return token;
}
