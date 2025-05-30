import slugify from 'slugify';
import categoryModel from '../../../DB/models/category.model.js';
import { AppError } from '../../utils/AppError.js';
import cloudinary from '../../utils/cloudinary.js';
import subCategoryModel from '../../../DB/models/subCategory.model.js';
import productModel from '../../../DB/models/product.model.js';
import paginate from '../../utils/paginate.js';


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
    const categories = await paginate(categoryModel,{},{
        page: req.query.page,
        limit: req.query.limit
    });
    if (!categories) {
        return next(new AppError('Failed to get categories',404));
    }
    return res.status(200).json({message: 'success', categories});
}

export const getActive = async (req,res,next)=>{
    const categories = await paginate(categoryModel,{status: 'active'},{
        page: req.query.page,
        limit: req.query.limit
    });
    if (!categories) {
        return next(new AppError('Failed to get categories',404));
    }
    return res.status(200).json({message: 'success', categories});
}

export const getInactive = async (req,res,next)=>{
    const categories = await paginate(categoryModel,{status: 'inactive'},{
        page: req.query.page,
        limit: req.query.limit
    });
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

export const updateImage = async (req,res,next)=>{
    const {id} = req.params;
    const category = await categoryModel.findById(id);
    if(!category){
        return next(new AppError('Category not found',404));
    }
    if(!category.admins.includes(req.id) && req.role != 'super_Admin'){
        return next(new AppError('You are not authorized to access this category',403));
    }
    if(category.status == 'inactive'){
        return next(new AppError('You can not updateImage for this category because it is inactive',403));
    }
     if(!req.files){
            return next(new AppError("please upload a image", 400));
        }
        const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.image[0].path,
            {folder:`${process.env.APP_NAME}/category/${category.name}`}
        ); 
        if(!secure_url){
            return next(new AppError("error in uploading the image", 400));
        }
        category.image = {secure_url , public_id};
        await category.save(); 
        return res.status(200).json({message: 'Category image updated successfully', category});
}

export const deleteCategory = async (req,res,next)=>{
    const {categoryId} = req.params;
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return next(new AppError('Category not found',404));
    }
    const subCategories = await subCategoryModel.find({categoryId});
    for(const subCategory of subCategories){
        const products = await productModel.find({subCategoryId: subCategory._id});

        for(const product of products){
            if(product.image){
                await cloudinary.uploader.destroy(product.image);
            }

            await product.deleteOne();
        }
        if (subCategory.image) {
            await cloudinary.uploader.destroy(subCategory.image);
        }

        await subCategory.deleteOne();
    }

    if(category.image){
        await cloudinary.uploader.destroy(category.image);
    }

    await category.deleteOne();
    return res.status(200).json({message:"success"});
}