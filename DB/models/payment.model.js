import {mongoose, model, Schema, Types } from "mongoose";


const paymentSchema = new Schema({
    userId:{
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderId:{
        type: Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    amount:{
        type: Number,
        required: true,
    },
    currency:{
        type: String,
        default: "USD",
    },
    status:{
        type: String,
        default: "pending",
        enum: ['pending', 'succeeded', 'failed', 'refunded'],
    },
    paymentMethod:{
        type: String,
        enum: ["cash", "card", "paypal"],
        required: true,
    },
    provider:{
        type: String,
        required: true,
    },
    providerPaymentId:{
        type: String,
    }
},{timestamps: true});

const paymentModel = mongoose.models.Payment || model('Payment', paymentSchema);
export default paymentModel;