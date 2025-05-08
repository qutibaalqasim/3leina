import suggestionModel from "../../../DB/models/suggestion.model.js";
import cloudinary from "../../utils/cloudinary.js";



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