import mongoose, { Schema, Types, model } from 'mongoose';

const subCategorySchema = new Schema({
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
        default: 'active',
    },
    categoryId: {
        type: Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

const subCategoryModel = mongoose.models.SubCategory || model('SubCategory', subCategorySchema);
export default subCategoryModel;