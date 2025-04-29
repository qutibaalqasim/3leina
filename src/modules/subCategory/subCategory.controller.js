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