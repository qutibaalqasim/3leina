import categoryModel from "../../../DB/models/category.model.js";
import userModel from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";



export const createAdmin = async (req, res, next) => {
    const {categoryId} = req.params;
    const {userId, role} = req.body;
    const admin = await userModel.findByIdAndUpdate(userId, {role}, {new: true});
    if (!admin) {
        return next(new AppError('Failed to create admin', 404));
    }
    const category = await categoryModel.findByIdAndUpdate(categoryId, {$push: {admins: userId}}, {new: true});
    if (!category) {
        return next(new AppError('Failed to create admin', 404));
    }
    return res.status(201).json({message: 'Admin created successfully', admin, category});
}

export const getAllAdmins = async (req, res, next) => {
    const admins = await userModel.find({role: 'admin'});
    if (!admins) {
        return next(new AppError('Failed to get admins', 404));
    }
    return res.status(200).json({message: 'success', admins});
}

export const getActive = async (req, res, next) => {
    const admins = await userModel.find({role: 'admin', status: 'active'});
    if (!admins) {
        return next(new AppError('Failed to get admins', 404));
    }
    return res.status(200).json({message: 'success', admins});
}

export const getInactive = async (req, res, next) => {
    const admins = await userModel.find({role: 'admin', status: 'inactive'});
    if (!admins) {
        return next(new AppError('Failed to get admins', 404));
    }
    return res.status(200).json({message: 'success', admins});
}

export const getAdminDetails = async (req,res,next)=>{
    const {adminId} = req.params;
    const admin = await userModel.findById(adminId);
    if (!admin) {
        return next(new AppError('Failed to get admin details', 404));
    }
    return res.status(200).json({message: 'success', admin});
}