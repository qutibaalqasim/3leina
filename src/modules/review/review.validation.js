import joi from 'joi';



export const addReviewSchema = joi.object({
    productId: joi.string().required(),
    comment: joi.string().required(),
    rating: joi.number(),
});