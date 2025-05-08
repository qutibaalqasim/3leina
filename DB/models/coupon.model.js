import mongoose, { Schema, Types,  model } from "mongoose";


const couponSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    amount:{
        type: Number,
        required: true,
    },
    expireDate:{
        type: Date,
        required: true,
    },
    usedBy:[
        {
            type: Types.ObjectId,
            ref: 'User',
        }
    ],
    createdBy:{
        type: Types.ObjectId,
        ref: 'User',
    },
    updatedBy:{
        type: Types.ObjectId,
        ref: 'User',
    },
},{timestamps: true});

const couponModel = mongoose.models.Coupon || model('Coupon', couponSchema);
export default couponModel;