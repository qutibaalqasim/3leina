import couponModel from "../../../DB/models/coupon.model.js";
import { AppError } from "../../utils/AppError.js";


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