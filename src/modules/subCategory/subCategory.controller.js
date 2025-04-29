import slugify from "slugify";
import categoryModel from "../../../DB/models/category.model.js";
import { AppError } from "../../utils/AppError.js";
import subCategoryModel from "../../../DB/models/subCategory.model.js";



export const createSubCategory = async (req, res, next) => {
    const {categoryId} = req.params;
    const {name} = req.body;
    const slug = slugify(name);
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return next(new AppError('Category not found', 404));
    }
    if(!category.admins.includes(req.id) && req.role != 'super_Admin'){
        return next(new AppError('You are not authorized to access this category',403));
    }
    const subCategory = await subCategoryModel.create({...req.body, slug, categoryId, createdBy: req.id , updatedBy: req.id});
    if (!subCategory) {
        return next(new AppError('Failed to create subCategory',400));
    }
    return res.status(201).json({message: 'SubCategory created successfully', subCategory});
}