import cartModel from "../../../DB/models/cart.model.js"
import couponModel from "../../../DB/models/coupon.model.js";
import orderModel from "../../../DB/models/order.model.js";
import productModel from "../../../DB/models/product.model.js";
import userModel from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";


export const createOrder = async (req, res, next)=>{
    const {couponName} = req.body;
   const cart = await cartModel.findOne({userId:req.id});
   if(!cart){
    return next(new AppError("there is no products in the cart!!",404));
   }
   if(couponName){
     const coupon = await couponModel.findOne({name:couponName});
     if(!coupon){
        return next(new AppError("coupon not found!!",404));
     }
     if(coupon.expireDate <= new Date()){
        return next(new AppError("this coupon is expired",400));
     }
     if(coupon.usedBy.includes(req.id)){
        return next(new AppError("coupon already used",400));
     }
     req.body.coupon = coupon;
   }
   const finalProducts = [];
   let subTotal = 0;
   for(let product of cart.products){
     const checkProduct = await productModel.findOne({
        _id:product.productId,
        stock:{$gte:product.quantity}
     });
     if(!checkProduct){
        return next(new AppError("product quantity not available",400));
     }
     // bson to json
     product = product.toObject();
     product.name = checkProduct.name;
     product.unitPrice = checkProduct.priceAfterDiscount;
     product.finalPrice = product.quantity * checkProduct.priceAfterDiscount;
     subTotal += product.finalPrice;
     finalProducts.push(product);
   }
    const user = await userModel.findById(req.id);
    if(!req.body.address){
        req.body.address = user.address;
    }
    if(!req.body.phoneNumber){
        req.body.phoneNumber = user.phone;
    }

    const order = await orderModel.create({
        userId:req.id,
        products:finalProducts,
        couponName: couponName ?? '',
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        finalPrice: subTotal - (subTotal * ((req.body.coupon?.amount || 0))/100)
    });
    if(req.body.coupon){
        await couponModel.updateOne({_id:req.body.coupon._id},
            {
                $addToSet:{
                    usedBy:req.id
                }
            }
        );
    }

    await cartModel.updateOne({userId:req.id},{
        products:[],
    });

    return res.status(201).json({message:"success", order});
}

export const getAllOrders = async (req,res,next)=>{
    const orders = await orderModel.find({});
    return res.status(200).json({message:"success", orders});
}

export const getUserOrders = async (req,res,next)=>{
    const orders = await orderModel.find({userId:req.id});
    return res.status(200).json({message:"success", orders});
}

export const getOrderByStatus = async (req,res,next)=>{
    const {status} = req.params;
    const orders = await orderModel.find({status});
    return res.status(200).json({message:"success", orders});
}

export const getConfirmedOrders = async (req,res,next)=>{
    const orders = await orderModel.find({status:"confirmed"});
    return res.status(200).json({message:"success", orders});
}

//for all users have an order
export const cancelledOrder = async(req,res,next)=>{
    const {orderId} = req.params;
    const order = await orderModel.findById(orderId);
    if(!order){
        return next (new AppError("order not found",404));
    }
    if(order.status == 'confirmed' || order.status == 'onWay' || order.status == 'delivered'){
        return next(new AppError("can't cancelled this order" , 400));
    }
    if(order.userId != req.id){
        return next(new AppError("not authorized to cancelled this order", 400));
    }
    order.status = req.body.status;
    order.updatedBy = req.id;
     if(req.body.status == 'cancelled'){
          if(req.body.coupon){
            await couponModel.updateOne({_id:req.body.coupon._id},{
                $pull:{
                    usedBy:req.id
                    }
            });
                            }
    }
    await order.save();
    return res.status(200).json({message:"success", order});

}

export const acceptOrder = async(req,res,next)=>{
    const {orderId} = req.params;
    const order = await orderModel.findById(orderId);
    if(!order){
        return next (new AppError("order not found",404));
    }
    if(order.deliveryAgent){
        return next(new AppError("the order taken by other delivery",400));
    }
    order.deliveryAgent = req.id;
    await order.save();
    return res.status(201).json({message:"success", order});

}

// for the superAdmin just
export const changeStatus = async (req,res,next)=>{
    const {orderId} = req.params;
    const order = await orderModel.findById(orderId);
    if(!order){
        return next(new AppError("order not found",404));
    }
    if(req.body.status == "cancelled"){
        if(order.userId != req.id){
            return next(new AppError("not authrized to cancelled this order",400));
        }
    }
    order.status = req.body.status;
    order.updatedBy = req.id;
    const cart = await cartModel.findOne({ userId: req.id });
    if(req.body.status == 'confirmed'){
        for(const product of cart.products){
       await productModel.updateOne({_id:product.productId},{
        $inc:{
            stock:-product.quantity
        }
       });
    }
    }
    await order.save();
    return res.status(200).json({message:"success", order});
}

// for the deliveryAgent
export const deliveredOrder = async(req,res,next)=>{
    const {orderId} = req.params;
    const order = await orderModel.findById(orderId);
    if(!order){
        return next(new AppError("order not found",404));
    }
    if(order.deliveryAgent != req.id){
        return next(new AppError("not authrized to change the status for this order",400));
    }
    order.status = req.body.status;
    order.updatedBy = req.id;
    await order.save();
    return res.status(201).json({message:"success", order});
}