import mongoose from "mongoose";


const connectDb = async ()=>{
        return await mongoose.connect(process.env.DB)
        .then(() => {
            console.log("MongoDB connected successfully...");
        })
        .catch((err) => {
            console.log("MongoDB connection failed...", err.message);
        });
}


export default connectDb;