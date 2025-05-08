import mongoose, { model, Schema, Types } from "mongoose";


const favoriteSchema = new Schema({
    userId:{
        type: Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    favoriteProducts:[
        {
           
                type: Types.ObjectId,
                ref: "Product",
            
        }
    ],
    favoriteUsers:[
        {
            
                type: Types.ObjectId,
                ref: "User",
            
        }
    ]
}, {
    timestamps: true,
});

const favoriteModel = mongoose.model.Favorite || model('Favorite', favoriteSchema);
export default favoriteModel;


