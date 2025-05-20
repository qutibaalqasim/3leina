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
    return res.status(201).json({message:"success", review});
}