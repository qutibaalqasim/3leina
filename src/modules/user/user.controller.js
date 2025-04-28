import userModel from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";



export const getAllUsers = async (req, res, next) => {
    const users = await userModel.find({role: 'user'});
    if (!users) {
        return next(new Error("No users found", 404 ));
    }
    return res.status(200).json({ message: "success", users });
}


export const getActiveUsers = async (req, res, next) => {
    const users = await userModel.find({role: 'user', status: 'active'});
    if (!users) {
        return next(new Error("No users found", 404 ));
    }
    return res.status(200).json({ message: "success", users });
}

export const getUserDetails = async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
        return next(new Error("No user found", 404 ));
    }
    return res.status(200).json({ message: "success", user });
}

// this function is used to update user details for all users .
export const updateUser = async (req,res,next)=>{
    const {id} = req.params;
    if(req.id != id){
        return next(new AppError("unothrized to update this user", 400));
    }
    if(req.body.userName){
        const userName = await userModel.findOne({userName:req.body.userName});
        if(userName){
            return next(new AppError("this user name is already taken", 400));
        }
    }
    if(req.body.email){
        const email = await userModel.findOne({email:req.body.email});
        if(email){
            return next(new AppError("this email is already taken", 400));
        }
    }
    const user = await userModel.findByIdAndUpdate({_id:id},req.body,{new:true});
    if (!user) {
        return next(new Error("No user found", 404 ));
    }
    return res.status(200).json({ message: "success", user });
}
