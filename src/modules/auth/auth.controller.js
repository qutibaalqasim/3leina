import userModel from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from 'bcryptjs';
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from 'jsonwebtoken';
import { nanoid , customAlphabet  } from 'nanoid';


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

export const login = async (req, res, next) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return next(new AppError('Invalid email', 404));
    }

    if(!user.confirmEmail){
        return next(new AppError('Please confirm your email', 400));
    }

    if(user.status === 'inactive'){
        return next(new AppError('Your account is Blocked', 400));
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if(!checkPassword){
        return next(new AppError('Invalid password', 400));
    }
    const token = jwt.sign({id: user._id, userName: user.userName, email: user.email , role: user.role}, process.env.LOGIN_TOKEN);
    return res.status(200).json({message: 'Login successfully', token});
}

export const sendCode = async (req, res, next) => {
    const {email} = req.body;
    const code = customAlphabet('1234567890abcdefABCDEF', 4)();
    const user = await userModel.findOneAndUpdate({email}, {sendCode: code});
    if(!user){
        return next(new AppError('Invalid email', 404));
    }
    const html = `<h1>Reset password Code</h1>
    <p>your code is ${code}</p>`;
    await sendEmail(email, 'Reset password code', html);
    return res.status(200).json({message: 'success'});

}
