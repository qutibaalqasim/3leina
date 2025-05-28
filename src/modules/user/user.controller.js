import userModel from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";
import bcrypt from 'bcryptjs';
import paginate from "../../utils/paginate.js";


export const getAllUsers = async (req, res, next) => {
    const users = await paginate(userModel,{role: 'user'},{
        page: req.query.page,
        limit: req.query.limit,
        select: "userName email userImage status role createdAt updatedAt"
    });
    if (!users) {
        return next(new AppError("No users found", 404 ));
    }
    return res.status(200).json({ message: "success", users });
}

export const getActiveUsers = async (req, res, next) => {
    const users = await paginate(userModel,{role: 'user', status: 'active'},{
        page: req.query.page,
        limit: req.query.limit,
        select: "userName email userImage status role createdAt updatedAt"
    });
    if (!users) {
        return next(new AppError("No users found", 404 ));
    }
    return res.status(200).json({ message: "success", users });
}

export const getInactiveUsers = async (req, res, next) => {
    const users = await paginate(userModel,{role: 'user', status: 'inactive'},{
        page: req.query.page,
        limit: req.query.limit,
        select: "userName email userImage status role createdAt updatedAt"
    });
    if (!users) {
        return next(new AppError("No users found", 404 ));
    }
    return res.status(200).json({ message: "success", users });
}

export const getUserDetails = async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
        return next(new AppError("No user found", 404 ));
    }
    return res.status(200).json({ message: "success", user });
}

// this function is used to change user status for all users .
export const changeUserStatus = async (req, res, next) => {
    const {id} = req.params;
    const {status} = req.body;
    const user = await userModel.findByIdAndUpdate(id, {status}, {new: true});
    if (!user) {
        return next(new AppError("No user found", 404 ));
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
    if(req.body.password){
        const hashedPassword = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS));
        req.body.password = hashedPassword;
    }
    const user = await userModel.findByIdAndUpdate({_id:id},req.body,{new:true});
    if (!user) {
        return next(new AppError("No user found", 404 ));
    }
    return res.status(200).json({ message: "success", user });
}
// this function is used to update user Image for all users .
export const updateUserImage = async (req,res,next)=>{
    const {id} = req.params;
    if(req.id != id){
        return next(new AppError("unothrized to update this user Image", 400));
    }
    const user = await userModel.findById(id);
    if (!user) {
        return next(new AppError("No user found", 404 ));
    }
    if(!req.files){
        return next(new AppError("please upload a file", 400));
    }
    const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.userImage[0].path,
        {
            folder: `${process.env.APP_NAME}/users/${user.userName}`
        }
    ); 
    if(!secure_url){
        return next(new AppError("error in uploading the image", 400));
    }
    user.userImage = {secure_url , public_id};
    await user.save();
    return res.status(200).json({ message: "success", user });   
}
// this function is used to delete user for all users .
export const deleteUser = async (req,res,next)=>{
    const {id} = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
        return next(new AppError("No user found", 404 ));
    }
    return res.status(200).json({ message: "success"});
}
// this function is used to rating any user by others.
export const ratingUser = async(req,res,next)=>{
    const {userId} = req.params;
    const {rating} = req.body;
    const user = await userModel.findByIdAndUpdate(
        userId,
        {rating},
        {new:true}
    );
    if(!user){
        return next(new AppError("user not found",404));
    }
    return res.status(200).json({message:"success", user});
}
