import mongoose, { model, Schema, Types } from "mongoose";


const suggestionSchema = new Schema({
    userId:{
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    suggestion:{
        type: String,
        required: true,
    },
    image:{
        type: ObjectId,
    }
},{ timestamps: true });


const suggestionModel = mongoose.models.Suggestion || model('Suggestion', suggestionSchema);
export default suggestionModel;