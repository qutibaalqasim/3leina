import cartModel from "../../../DB/models/cart.model.js";
import productModel from "../../../DB/models/product.model.js";
import { AppError } from "../../utils/AppError.js";


export const addToCart = async (req, res, next) => {
    const {productId} = req.body;
    const cart = await cartModel.findOne({userId: req.id});
    if(!cart){
        const newCart = await cartModel.create({userId: req.id, products:{productId}});
        return res.status(201).json({message: "success", newCart});
    }
    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].productId == productId) {
            return next(new AppError("Product already in cart", 409));
        }
    }
    cart.products.push({productId});
    await cart.save();
    return res.status(200).json({message: "success", cart});
}

export const getCart = async (req, res, next) => {
    const cart = await cartModel.findOne({userId: req.id}).populate("products.productId", "name price image");
    if(!cart){
       return next(new AppError("Cart not found", 404));
    }
    return res.status(200).json({message: "success", cart});
}

export const clearCart = async (req, res, next) => {
    const cart = await cartModel.findOne({userId: req.id});
    if(!cart){
       return next(new AppError("Cart not found", 404));
    }
    cart.products = [];
    await cart.save();
    return res.status(200).json({message: "success", cart});
}

export const deleteFromCart = async (req,res,next)=>{
    const {productId} = req.body;
    const cart = await cartModel.findOneAndUpdate(
        { userId: req.id },
        { $pull: { products: { productId } } },
        { new: true }
      );
    if(!cart){
        return next(new AppError("Cart not found", 404));
    }
    return res.status(200).json({message: "success", cart});
}

export const updateQuantity = async (req, res, next) => {
    const {productId, quantity} = req.body;
    const product = await productModel.findById(productId);
    if(product.stock < quantity){
        return next(new AppError("Not enough stock", 409));
    }
    const cart = await cartModel.findOneAndUpdate(
        { userId: req.id, "products.productId": productId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
    );
    if(!cart){
        return next(new AppError("Cart not found", 404));
    }
    return res.status(200).json({message: "success", cart});

}

