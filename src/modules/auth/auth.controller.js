import userModel from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from 'bcryptjs';
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
   const {userName, email , password} = req.body;
   const user = await userModel.findOne({
         $or:[
            {userName},
            {email}
         ]
   });

   if(user){
    return next(new AppError('userName or email already exist', 400));
   }

   const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
   const newUser = await userModel.create({userName, email, password: hashedPassword});
   const token = jwt.sign({email}, process.env.REGISTER_TOKEN);
   const html = `<h1>welcome ${userName}</h1>
   <p>your account has been created successfully</p>
   <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}">Confirm Email</a>`;
   sendEmail(email, 'Welcome to 3leina stage', html);
    return res.status(201).json({message: 'user created successfully', newUser});
}


export const confirmEmail = async(req,res,next)=>{
    const {token} = req.params; 
    const decoded = jwt.verify(token, process.env.REGISTER_TOKEN);
    if(!decoded){
        return next(new AppError('Invalid token', 400));
    }
    const user = await userModel.findOneAndUpdate({email: decoded.email}, {confirmEmail: true});
    return res.status(200).json({message: 'Email confirmed successfully'});
}