import userModel from "../../../DB/models/user.model.js"
import { AppError } from "../../utils/AppError.js";
import paginate from "../../utils/paginate.js";



export const createDelivery = async(req,res,next)=>{
    const {id} = req.params;
    const {role} = req.body;
    const user = await userModel.findByIdAndUpdate(id, {role}, {new: true});
    if (!user) {
        return next(new AppError("User not found", { cause: 404 }));
    }
    return res.status(200).json({message:"success", user});
}

export const getAllDelivery = async (req, res,next) => {
    const delivery = await paginate(userModel,{role: "delivery_Agent"},{
        page: req.query.page,
        limit: req.query.limit,
    });
    if (!delivery) {
        return next(new AppError("No delivery agents found", { cause: 404 }));
    }
    return res.status(200).json({message:"success", delivery});
}

export const getActive = async (req,res,next)=>{
    const delivery = await paginate(userModel,{role: "delivery_Agent", status: "active"},{
        page: req.query.page,
        limit: req.query.limit,
    });
    if (!delivery) {
        return next(new AppError("No active delivery agents found", { cause: 404 }));
    }
    return res.status(200).json({message:"success", delivery});
}

export const getInactive = async (req,res,next)=>{
    const delivery = await paginate(userModel,{role: "delivery_Agent", status: "inactive"},{
        page: req.query.page,
        limit: req.query.limit,
    });
    if (!delivery) {
        return next(new AppError("No inactive delivery agents found",  404 ));
    }
    return res.status(200).json({message:"success", delivery});
}

export const getDeliveryDetails = async (req,res,next)=>{
    const {id} = req.params;
    const delivery = await userModel.findById(id);
    if (!delivery) {
        return next(new AppError("Delivery agent not found",  404 ));
    }
    return res.status(200).json({message:"success", delivery});
}


