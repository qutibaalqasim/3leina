import suggestionModel from "../../../DB/models/suggestion.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";
import paginate from "../../utils/paginate.js";



export const createSuggestion = async (req, res, next) => {
    const {suggestion} = req.body;
    if(req.files && req.files.image && req.files.image[0]){
        const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.image[0].path,
            {
                folder: `${process.env.APP_NAME}/suggestion/${req.id}`,
            }
        );
        req.body.image = {secure_url, public_id};
    }
    const newSuggestion = await suggestionModel.create({
        userId: req.id,
        suggestion,
        image: req.body.image,
    });
    if (!newSuggestion) return next(new AppError("Failed to create suggestion", 400));
    return res.status(201).json({ message: "success", suggestion: newSuggestion });
    
}

export const getAllSuggestion = async (req, res, next) => {
    const suggestion = await paginate(suggestionModel,{},{
        page: req.query.page,
        limit: req.query.limit,
        select: "suggestion image userId createdAt updatedAt",
    });
    if (!suggestion) return next(new AppError("Failed to get suggestion", 400));
    return res.status(200).json({ message: "success", suggestion });
}

export const updateSuggestion = async (req,res,next)=>{
    const {id} = req.params;
    const suggestion = await suggestionModel.findById(id);
    if(!suggestion){
        return next(new AppError('not found!!', 404));
    }
     if(req.id != suggestion.userId){
        return next(new AppError("You are not allowed to delete this suggestion", 403));
    }
    if(req.body.files){
        await cloudinary.uploader.destroy(suggestion.image.public_id, {
        folder: `${process.env.APP_NAME}/suggestion/${req.id}`,
    });
    const {secure_url, public_id} = await cloudinary.uploader.upload(req.files.image[0].path,
            {
                folder: `${process.env.APP_NAME}/suggestion/${req.id}`,
            }
        );
         req.body.image = {secure_url, public_id};
    }
    
     const updatedSuggestion = await suggestionModel.findByIdAndUpdate(id ,{...req.body},{new: true});
     return res.status(200).json({message:"updated successfully", updatedSuggestion});

  
}

export const deleteSuggestion = async (req, res, next) => {
    const { id } = req.params;
    const suggestion = await suggestionModel.findById(id);
    if(req.id != suggestion.userId){
        return next(new AppError("You are not allowed to delete this suggestion", 403));
    }
    await cloudinary.uploader.destroy(suggestion.image.public_id, {
        folder: `${process.env.APP_NAME}/suggestion/${req.id}`,
    });
    const deletedSuggestion = await suggestionModel.findByIdAndDelete(id);
    if (!deletedSuggestion) return next(new AppError("Failed to delete suggestion", 400));
    return res.status(200).json({ message: "success" });
}
