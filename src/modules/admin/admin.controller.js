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