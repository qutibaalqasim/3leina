import slugify from "slugify";
import subCategoryModel from "../../../DB/models/subCategory.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";
import productModel from "../../../DB/models/product.model.js";



export const createProduct = async (req, res, next) => {
    const {name , description , price, subCategoryId } = req.body;
    req.body.slug = slugify(name);
    const checkSubCategory = await subCategoryModel.findById(subCategoryId).populate("categoryId");
    if(!checkSubCategory){
        return next(new AppError("SubCategory not found", 404));
    } 
    const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,
        {
            folder: `${process.env.APP_NAME}/category/${checkSubCategory.categoryId.name}/subCategory/${checkSubCategory.name}/product/${name}/mainImage`,
        }
    );

    req.body.subImages = [];
    if(req.files.subImages){
        for(const file of req.files.subImages){
            const {secure_url, public_id} = await cloudinary.uploader.upload(file.path,
                {
                     folder: `${process.env.APP_NAME}/category/${checkSubCategory.categoryId.name}/subCategory/${checkSubCategory.name}/product/${name}/subImages`
                }
            );
            req.body.subImages.push({secure_url, public_id});
        }
    }
    req.body.mainImage = {secure_url, public_id};
    req.body.createdBy = req.id;
    req.body.updatedBy = req.id;
    req.body.subCategoryId = subCategoryId;
    const product = await productModel.create({...req.body});
    if(!product){
        return next(new AppError("Failed to create product", 400));
    }
    return res.status(201).json({message: "Product created successfully", product});
}

export const getAllProducts = async (req,res,next)=>{
    const products = await productModel.find({}).select('name description status stock mainImage');
    return res.status(200).json({message: "success", products});
}

export const getAllActive = async (req,res,next)=>{
    const products = await productModel.find({status: "active"}).select('name description status stock mainImage');
    return res.status(200).json({message: "success", products});
}

export const getAllInActive = async (req,res,next)=>{
    const products = await productModel.find({status: "inactive"}).select('name description status stock mainImage');
    return res.status(200).json({message: "success", products});
}

// get all products by subCategoryId and status active for all users
export const getActiveBySubCategoryId = async (req,res,next)=>{
    const {subCategoryId} = req.params;
    const products = await productModel.find({status: "active", subCategoryId});
    return res.status(200).json({message: "success", products});
}

export const getInActiveBySubCategoryId = async (req,res,next)=>{
    const {subCategoryId} = req.params;
    const subCategory = await subCategoryModel.findById(subCategoryId).populate("categoryId");
    if(!subCategory){
        return next(new AppError("SubCategory not found", 404));
    }
    if(!subCategory.categoryId.admins.includes(req.id) && req.role != 'super_Admin'){
        return next(new AppError('You are not authorized to access this category',403));
    }

    const products = await productModel.find({status: "inactive", subCategoryId}).select('name description status stock mainImage');
    return res.status(200).json({message: "success", products});
}
// get product details by productId for all users
export const getProductDetails = async (req,res,next)=>{
    const {productId} = req.params;
    const product = await productModel.findById(productId);
    if(!product){
        return next(new AppError("Product not found", 404));
    }
    return res.status(200).json({message: "success", product});
}

export const changeStatus = async (req,res,next)=>{
    const {productId} = req.params;
    const {status} = req.body;
    const product = await productModel.findById(productId).populate({path:"subCategoryId",populate:{path:"categoryId" ,select:"admins"} });
    if(!product){
        return next(new AppError("product not found", 404));
    }
    if(!product.subCategoryId.categoryId.admins.includes(req.id) && req.role != 'super_Admin'){
        return next(new AppError('You are not authorized to access this category',403));
    }
    product.status = status;
    await product.save();
    return res.status(200).json({message: "success", product});
}

export const updateProduct = async (req,res,next)=>{
    const {productId} = req.params;
    const {name , subCategoryId } = req.body;
    const product = await productModel.findById(productId).populate({path:"subCategoryId",populate:{path:"categoryId" ,select:"name admins"} });
    if(!product){
        return next(new AppError("product not found", 404));
    }
    if (product.createdBy != req.id) {
        return next(new AppError('You are not authorized to update this product', 403));
    }
    if(name){
        req.body.slug = slugify(name);
    }
    if(req.files.mainImage){
        if(product.mainImage && product.mainImage.public_id){
            await cloudinary.uploader.destroy(product.mainImage.public_id);
        }
        const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,
            {
                folder: `${process.env.APP_NAME}/category/${product.subCategoryId.categoryId.name}/subCategory/${product.subCategoryId.name}/product/${product._id}/mainImage`,
            }
        );
        req.body.mainImage = {secure_url, public_id};
    }
    req.body.subImages = [];
    if(req.files.subImages){
        if (product.subImages && Array.isArray(product.subImages)) {
            for (const image of product.subImages) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }
        for(const file of req.files.subImages){
            const {secure_url, public_id} = await cloudinary.uploader.upload(file.path,
                {
                     folder: `${process.env.APP_NAME}/category/${product.subCategoryId.categoryId.name}/subCategory/${product.subCategoryId.name}/product/${product._id}/subImages`,
                }
            );
            req.body.subImages.push({secure_url, public_id});
        }
    }
    req.body.updatedBy = req.id;
    req.body.subCategoryId = subCategoryId;
    const updatedProduct = await productModel.findByIdAndUpdate(productId,{...req.body},{new:true});
    if(!updatedProduct){
        return next(new AppError("Failed to update product", 400));
    }
    return res.status(200).json({message: "Product updated successfully", updatedProduct});
}

export const deleteProduct = async (req,res,next)=>{
    const {productId} = req.params;
    const product = await productModel.findById(productId).populate({path:"subCategoryId",populate:{path:"categoryId" ,select:"name admins"} });
    if(!product){
        return next(new AppError("product not found", 404));
    }
    if (product.createdBy != req.id) {
        return next(new AppError('You are not authorized to delete this product', 403));
    }
    if(product.mainImage && product.mainImage.public_id){
      try{
        await cloudinary.uploader.destroy(product.mainImage.public_id);
      }catch(err){
        console.log("Could not delete mainImage:", err.message);
      }
    }
    if (product.subImages && Array.isArray(product.subImages)) {
       try{
        for (const image of product.subImages) {
            await cloudinary.uploader.destroy(image.public_id);
        }
       }catch(err){
        console.log("Could not delete subImages:", err.message);
       }
        
    }
    const path = `${process.env.APP_NAME}/category/${product.subCategoryId.categoryId.name}/subCategory/${product.subCategoryId.name}/product/${product._id}`;
    try {
        await cloudinary.api.delete_folder(`${path}/mainImage`);
    } catch (err) {
        console.log("Could not delete mainImage folder:", err.message);
    }

    try {
        await cloudinary.api.delete_folder(`${path}/subImages`);
    } catch (err) {
        console.log("Could not delete subImages folder:", err.message);
    }

    try {
        await cloudinary.api.delete_folder(path);
    } catch (err) {
        console.log("Could not delete product folder:", err.message);
    }
    await productModel.findByIdAndDelete(productId);
    return res.status(200).json({message: "Product deleted successfully"});
}