import { AppError } from "../utils/AppError.js";
import jwt from 'jsonwebtoken';



export const auth = (accessRules = [])=>{
    return async(req, res, next)=>{
        const {token} = req.headers;
        if(!token){
            return next(new AppError('Unauthorized', 400));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return next(new AppError('invalid token', 400));
        }

        const user = await userModel.findByPk(decoded.id);
        if(!user){
            return next(new AppError("user not found",404));
        }
        if(!accessRoles.includes(user.role)){
            return next(new AppError("you are not authrized", 400));
        }
        req.id = decoded.id;
        req.universityId = decoded.universityId;
        req.role = decoded.role;
        next();
    }
}