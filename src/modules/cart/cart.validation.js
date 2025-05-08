import Joi from "joi";


export const addToCartSchema = Joi.object({
    productId: Joi.string().required(),
});

export const deleteFromCartSchema = Joi.object({
    productId: Joi.string().required(),
});

export const updateQuantitySchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
});