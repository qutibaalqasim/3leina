import mongoose, { model, Schema } from "mongoose";


const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 30,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        min: 6,
        trim: true,
    },
    phone:{
        type: String,
        min: 10,
    },
    address:{
        type: String,
        min: 5,
    },
    userImage:{
        type: Object
    },
    confirmEmail:{
        type: Boolean,
        default: false,
    },
    gender:{
        type: String,
        enum:['Male' , 'Female']
    },
    status:{
        type: String,
        enum:['active' , 'inactive'],
        default: 'active'
    },
    role:{
        type: String,
        enum:['super_Admin','admin', 'delivery_Agent' , 'user'],
        default: 'user'
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
    sendCode:{
        type: String,
        default: null,
    }
},{
    timestamps:true
});

const userModel = mongoose.model.User || model('User', userSchema);
export default userModel;