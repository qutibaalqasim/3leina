import {mongoose, model, Schema, Types } from "mongoose";



const messageSchema = new Schema({
    from:{
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    to:{
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "sent",
        enum: ['sent', 'delivered', 'read'],
    },
    attachments: [{
        type: String, 
    }],
}, {timestamps: true});

const messageModel = mongoose.models.Message || model('Message', messageSchema);
export default messageModel;