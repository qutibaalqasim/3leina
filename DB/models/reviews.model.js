import mongoose, { model, Schema, Types } from "mongoose";


const reviewSchema = new Schema({
    comment:{
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    createdBy:{
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId:{
        type: Types.ObjectId,
        ref: "Product",
        required: true,
    }
}, {
    timestamps: true,
});

const reviewModel = mongoose.model.Review || model('Review', reviewSchema);
export default reviewModel;