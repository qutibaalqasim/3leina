import {mongoose, model, Schema, Types } from "mongoose";


const orderSchema = new Schema({
    userId:{
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products:[
        {
            name:{
                type: String,
                required: true
            },
            productId:{
                type: Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity:{
                type: Number,
                default: 1,
                required:true
            },
            unitPrice:{
                type: Number,
                required: true
            },
            finalPrice:{
                type: Number,
                required: true
            }
        }
    ],
    couponName:{
        type: String,
    },
    finalPrice:{
        type: Number,
        required: true,
    },
    paymentType:{
        type: String,
        default: "cash",
        enum:["cash","card"],
    },
    phoneNumber:{
    type:String,
    required: true,
   },
   address:{
    type: String,
    required: true,
   },
   status:{
     type: String,
     default : "pending",
     enum: ["pending", "cancelled" ,"confirmed", "onWay", "delivered"],
   },
    note:String,
   reasonRejected:String,
   updatedBy:{
     type: Types.ObjectId,
     ref: "User",
   }
},{timestamps: true});


const orderModel = mongoose.models.Order || model('Order', orderSchema);
export default orderModel;