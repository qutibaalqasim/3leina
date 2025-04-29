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