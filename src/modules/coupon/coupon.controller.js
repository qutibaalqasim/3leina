import couponModel from "../../../DB/models/coupon.model.js";
import { AppError } from "../../utils/AppError.js";
import paginate from "../../utils/paginate.js";


export const create = async (req, res, next) => {
   const {name, amount} = req.body;
   if(await couponModel.findOne({name})){
       return next(new AppError('Coupon already exists', 400));
   }

   req.body.expireDate = new Date(req.body.expireDate);
   if(req.body.expireDate < new Date()){
       return next(new AppError('Expire date should be greater than today', 400));
   }
   req.body.createdBy = req.id;
   req.body.updatedBy = req.id;
   const coupon = await couponModel.create(req.body);
    return res.status(201).json({message: 'Coupon created successfully', coupon});
}

export const getAll = async (req, res) => {
    const coupons = await paginate(couponModel,{},{
        page: req.query.page,
        limit: req.query.limit,
    });
    if(!coupons || coupons.length === 0) {
        return next(new AppError('No coupons found', 404));
    }
    return res.status(200).json({message: 'Coupons retrieved successfully', coupons});
}

export const getActive = async (req,res,next)=>{
    const coupons = await paginate(couponModel,{status: 'active'},{
        page: req.query.page,
        limit: req.query.limit,
    });
    if(!coupons || coupons.length === 0) {
        return next(new AppError('No active coupons found', 404));
    }
    return res.status(200).json({message: 'Active coupons retrieved successfully', coupons});
}

export const getInactive = async (req,res,next)=>{
    const coupons = await paginate(couponModel,{status: 'inactive'},{
        page: req.query.page,
        limit: req.query.limit,
    });
    if(!coupons || coupons.length === 0) {
        return next(new AppError('No inactive coupons found', 404));
    }
    return res.status(200).json({message: 'Inactive coupons retrieved successfully', coupons});
}

export const getCouponDetails = async (req,res,next)=>{
    const {id} = req.params;
    const coupon = await couponModel.findById(id);
    if(!coupon) {
        return next(new AppError('Coupon not found', 404));
    }
    return res.status(200).json({message: 'Coupon retrieved successfully', coupon});
}

export const updateCoupon = async (req,res,next)=>{
    const {id} = req.params;
    const coupon = await couponModel.findById(id);
    if(!coupon) {
        return next(new AppError('Coupon not found', 404));
    }
    if(req.body.expireDate) {
        req.body.expireDate = new Date(req.body.expireDate);
        if(req.body.expireDate < new Date()){
            return next(new AppError('Expire date should be greater than today', 400));
        }
    }
    req.body.updatedBy = req.id;
    const updatedCoupon = await couponModel.findByIdAndUpdate(id, req.body, {new: true});
    return res.status(200).json({message:"success", updatedCoupon});
}

export const deleteCoupon = async (req,res,next)=>{
    const {id} = req.params;
    const coupon = await couponModel.findByIdAndDelete(id);
    if(!coupon) {
        return next(new AppError('Coupon not found', 404));
    }
    return res.status(200).json({message:"Coupon deleted successfully"});
}

