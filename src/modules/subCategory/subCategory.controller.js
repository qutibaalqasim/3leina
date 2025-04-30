import slugify from "slugify";
import categoryModel from "../../../DB/models/category.model.js";
import { AppError } from "../../utils/AppError.js";
import subCategoryModel from "../../../DB/models/subCategory.model.js";
import cloudinary from "../../utils/cloudinary.js";



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

export const getAllSubCategory = async (req, res, next) => {
    const subCategories = await subCategoryModel.find({});
    if (!subCategories) {
        return next(new AppError('Failed to get subCategories', 404));
    }
    return res.status(200).json({ message: 'success', subCategories });
}

export const getSubCategoriesByCategoryId = async (req, res, next) => {
    const {categoryId} = req.params;
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return next(new AppError('Category not found', 404));
    }
    if(!category.admins.includes(req.id) && req.role != 'super_Admin'){
        return next(new AppError('You are not authorized to create subCategory on this category',403));
    }
    const subCategories = await subCategoryModel.find({categoryId});
    if (!subCategories) {
        return next(new AppError('Failed to get subCategories', 404));
    }
    return res.status(200).json({ message: 'success', subCategories });
}

export const getAllActive = async (req, res, next) => {
    const subCategories = await subCategoryModel.find({status: 'active'});
    return res.status(200).json({ message: 'success', subCategories });
}

export const getAllInactive = async (req, res, next) => {
    const subCategories = await subCategoryModel.find({status: 'inactive'});
    return res.status(200).json({ message: 'success', subCategories });
}  

export const getAllActiveByCategoryId = async (req, res, next) => {
    const {categoryId} = req.params;
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return next(new AppError('Category not found', 404));
    }
    if(!category.admins.includes(req.id) && req.role != 'super_Admin'){
        return next(new AppError('You are not authorized to create subCategory on this category',403));
    }
    const subCategories = await subCategoryModel.find({categoryId, status: 'active'});
    return res.status(200).json({ message: 'success', subCategories });
}

export const getAllInActiveByCategoryId = async (req, res, next) => {
    const {categoryId} = req.params;
    const subCategories = await subCategoryModel.find({categoryId, status: 'inactive'});
    return res.status(200).json({ message: 'success', subCategories });
}

export const changeStatus = async (req, res, next) => {
    const { subCategoryId } = req.params;
    const { status } = req.body;
    const subCategory = await subCategoryModel.findById(subCategoryId);
    if(!subCategory) {
        return next(new AppError('SubCategory not found', 404));
    }
    const category = await categoryModel.findById(subCategory.categoryId);
    if(!category){
        return next(new AppError('Category not found', 404));
    }
    if(!category.admins.includes(req.id) && req.role != 'super_Admin'){
        return next(new AppError('You are not authorized to change status subCategory on this category',403));
    }
    subCategory.status = status;
    subCategory.updatedBy = req.id;
    await subCategory.save();
    return res.status(200).json({ message: 'success', subCategory });
}

export const updateSubCategory = async (req, res, next) => {
    const {subCategoryId} = req.params;
    const {name} = req.body;
    const slug = slugify(name);
    const subCategory = await subCategoryModel.findById(subCategoryId);    
    if(!subCategory) {
        return next(new AppError('SubCategory not found', 404));
    }
    const category = await categoryModel.findById(subCategory.categoryId);
    if(!category){
        return next(new AppError('Category not found', 404));
    }
    if(!category.admins.includes(req.id) && req.role != 'super_Admin'){
        return next(new AppError('You are not authorized to update subCategory on this category',403));
    }
    const updatedSubCategory = await subCategoryModel.findByIdAndUpdate(subCategoryId, {...req.body, slug, updatedBy: req.id}, {new: true});
    if (!updatedSubCategory) {
        return next(new AppError('Failed to update subCategory', 400));
    }
    return res.status(200).json({ message: 'success', updatedSubCategory });
}

export const updateImage = async (req, res, next) => {
    const {subCategoryId} = req.params;
    const subCategory = await subCategoryModel.findById(subCategoryId);
    if(!subCategory) {
        return next(new AppError('SubCategory not found', 404));
    }
    const category = await categoryModel.findById(subCategory.categoryId);
    if(!category){
        return next(new AppError('Category not found', 404));
    }
    if(!category.admins.includes(req.id) && req.role != 'super_Admin'){
        return next(new AppError('You are not authorized to update subCategory on this category',403));
    }
     if(!req.files){
                return next(new AppError("please upload a image", 400));
            }
            const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.image[0].path,
                {folder: `${process.env.APP_NAME}/category/${category.name}/subCategory/${subCategory.name}`}
            ); 
            if(!secure_url){
                return next(new AppError("error in uploading the image", 400));
            }
            subCategory.image = {secure_url , public_id};
            await subCategory.save(); 
            return res.status(200).json({message: 'success', category});
}