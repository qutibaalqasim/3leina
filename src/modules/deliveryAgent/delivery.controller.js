import userModel from "../../../DB/models/user.model.js"
import { AppError } from "../../utils/AppError.js";



export const createDelivery = async(req,res,next)=>{
    const {id} = req.params;
    const {role} = req.body;
    const user = await userModel.findByIdAndUpdate(id, {role}, {new: true});
    if (!user) {
        return next(new Error("User not found", { cause: 404 }));
    }
    return res.status(200).json({message:"success", user});
}

export const getAllDelivery = async (req, res,next) => {
    const delivery = await userModel.find({role: "delivery_Agent"});
    if (!delivery) {
        return next(new Error("No delivery agents found", { cause: 404 }));
    }
    return res.status(200).json({message:"success", delivery});
}

export const getActive = async (req,res,next)=>{
    const delivery = await userModel.find({role: "delivery_Agent", status: "active"});
    if (!delivery) {
        return next(new Error("No active delivery agents found", { cause: 404 }));
    }
    return res.status(200).json({message:"success", delivery});
}

export const getDeliveryDetails = async (req,res,next)=>{
    const {id} = req.params;
    const delivery = await userModel.findById(id);
    if (!delivery) {
        return next(new Error("Delivery agent not found",  404 ));
    }
    return res.status(200).json({message:"success", delivery});
}


