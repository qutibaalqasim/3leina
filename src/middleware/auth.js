import userModel from "../../DB/models/user.model.js";
import { AppError } from "../utils/AppError.js";
import jwt from 'jsonwebtoken';



export const auth = (accessRules = [])=>{
    try{
    return async(req, res, next)=>{
        const {token} = req.headers;
        if(!token){
            return next(new AppError('Unauthorized', 400));
        }

        const decoded = jwt.verify(token, process.env.LOGIN_TOKEN);
        if(!decoded){
            return next(new AppError('invalid token', 400));
        }

        const user = await userModel.findById(decoded.id);
        if(!user){
            return next(new AppError("user not found",404));
        }
        if(!accessRules.includes(user.role)){
            return next(new AppError("you are not authrized", 400));
        }
        req.id = decoded.id;
        req.role = decoded.role;
        next();
    }
}catch(error){
    return next(new AppError(error.message, 400));
}
}