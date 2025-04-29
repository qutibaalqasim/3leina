import slugify from "slugify";
import subCategoryModel from "../../../DB/models/subCategory.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";
import productModel from "../../../DB/models/product.model.js";



export const createProduct = async (req, res, next) => {
    const {name , description , price, subCategoryId } = req.body;
    req.body.slug = slugify(name);
    const checkSubCategory = await subCategoryModel.findById(subCategoryId);
    if(!checkSubCategory){
        return next(new AppError("SubCategory not found", 404));
    } 
    const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path);

    req.body.subImages = [];
    if(req.files.subImages){
        for(const file of req.files.subImages){
            const {secure_url, public_id} = await cloudinary.uploader.upload(file.path);
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