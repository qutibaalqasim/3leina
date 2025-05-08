import cartModel from "../../../DB/models/cart.model.js";


export const addToCart = async (req, res, next) => {
    const {productId} = req.body;
    const cart = await cartModel.findOne({userId: req.id});
    if(!cart){
        const newCart = await cartModel.create({userId: req.id, products:{productId}});
        return res.status(201).json({message: "success", newCart});
    }
    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].productId == productId) {
            return res.status(409).json({message: "Product already in cart"});
        }
    }
    cart.products.push({productId});
    await cart.save();
    return res.status(200).json({message: "success", cart});
}