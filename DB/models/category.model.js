import mongoose, { Schema, Types,model } from "mongoose";


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 3,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        min: 5,
    },
    image: {
        type: Object,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdBy:{
        type: Types.ObjectId,
        ref: 'User',
    },
    updatedBy:{
        type: Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });


const categoryModel = mongoose.model.Category || model('Category', categorySchema);
export default categoryModel;