import mongoose, { Schema, Types, model } from "mongoose";


const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        min: 3,
        max: 60,
    },
    slug:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true, 
        trim: true,
        min: 30,
    },
    stock:{
        type: Number,
        default: 1,
    },
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        default: 0,
    },
    priceAfterDiscount:{
        type: Number,
    },
    colors:[String],
    sizes:[
        {
            type: [String],
        }
    ],
    mainImage:{
        type: Object,
        required: true,
    },
    subImages:[
        {
            type: Object,
        }
    ],
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
    subCategoryId:{
        type: Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

productSchema.virtual('reviews',{
    ref: 'Review',
    localField:'_id',
    foreignField: 'productId'
})

const productModel = mongoose.model.Product || mongoose.model('Product', productSchema);
export default productModel;