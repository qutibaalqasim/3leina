import slugify from 'slugify';
import categoryModel from '../../../DB/models/category.model.js';
import { AppError } from '../../utils/AppError.js';


export const createCategory = async (req, res, next) => {
   const {name} = req.body;
    const slug = slugify(name);
    const userId = req.id;
    const category = await categoryModel.create({...req.body, slug, createdBy: userId , updatedBy: userId});
    if (!category) {
        return next(new AppError('Failed to create category',400));
    }
    return res.status(201).json({message: 'Category created successfully', category});
}

export const getAllCategories = async(req,res,next)=>{
    const categories = await categoryModel.find({});
    if (!categories) {
        return next(new AppError('Failed to get categories',404));
    }
    return res.status(200).json({message: 'success', categories});
}

export const getActive = async (req,res,next)=>{
    const categories = await categoryModel.find({status: 'active'});
    if (!categories) {
        return next(new AppError('Failed to get categories',404));
    }
    return res.status(200).json({message: 'success', categories});
}

export const getInactive = async (req,res,next)=>{
    const categories = await categoryModel.find({status: 'inactive'});
    if (!categories) {
        return next(new AppError('Failed to get categories',404));
    }
    return res.status(200).json({message: 'success', categories});
}

export const getCategoryDetails = async (req,res,next)=>{
    const {id} = req.params;
    const category = await categoryModel.findById(id);
    if(!category.admins.includes(req.id) && req.role != 'super_Admin'){
        return next(new AppError('You are not authorized to access this category',403));
    }
    if (!category) {
        return next(new AppError('Failed to get category',404));
    }
    return res.status(200).json({message: 'success', category});
}

export const changeStatus = async (req,res,next)=>{
    const {id} = req.params;
    const {status} = req.body;
    const category = await categoryModel.findByIdAndUpdate(id,{status},{new: true});
    if (!category) {
        return next(new AppError('Failed to update category',404));
    }
    return res.status(200).json({message: 'Category updated successfully', category});
}

export const updateCategory = async (req,res,next)=>{
    const {id} = req.params;
    const {name} = req.body;
    const slug = slugify(name);
    const userId = req.id;
    const cat = await categoryModel.findById(id);
    if(!cat){
        return next(new AppError('Category not found',404));
    }
    if(!cat.admins.includes(req.id) && req.role != 'super_Admin'){
        return next(new AppError('You are not authorized to access this category',403));
    }
    if(cat.status == 'inactive'){
        return next(new AppError('You can not update this category because it is inactive',403));
    }
    const category = await categoryModel.findByIdAndUpdate(id,{...req.body, slug, updatedBy: userId},{new: true});
    if (!category) {
        return next(new AppError('Failed to update category',404));
    }
    return res.status(200).json({message: 'Category updated successfully', category});
}