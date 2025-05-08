import joi from 'joi';


export const addToFavoriteSchema = joi.object({
    userId: joi.string(),
    productId: joi.string(),
});

export const deleteFromFavoriteSchema = joi.object({
    userId: joi.string(),
    productId: joi.string(),
});