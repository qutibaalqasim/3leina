import orderModel from "../../../DB/models/order.model.js";
import reviewModel from "../../../DB/models/Reviews.model.js";
import { AppError } from "../../utils/AppError.js";


export const addReview = async (req,res,next)=>{
    const {productId} = req.params;
    const {comment, rating} = req.body;
    const order = await orderModel.findOne({
        userId:req.id,
        status: 'delivered',
        "products.productId":productId
    });
    if(!order){
        return next(new AppError("can't review this product",400));
    }

    const review = await reviewModel.create({
        comment,
        rating,
        productId,
        createdBy: req.id
    });
    if(!review){
        return next(new AppError("error while adding review",400));
    }
    return res.status(201).json({message:"success", review});
}

export const updateReview = async (req,res,next)=>{
    const {reviewId} = req.params;
    const {comment, rating} = req.body;
    const review = await reviewModel.findOne({
        _id:reviewId,
        createdBy:req.id
    });

    if(!review){
        return next(new AppError("review not found",404));
    }
    if (comment !== undefined) review.comment = comment;
    if (rating !== undefined) review.rating = rating;
    await review.save();
    return res.status(200).json({message:"success", review});
}