import joi from 'joi';



export const addReviewSchema = joi.object({
    productId: joi.string().required(),
    comment: joi.string().required(),
    rating: joi.number(),
});

export const updateReviewSchema = joi.object({
    productId: joi.string().required(),
    reviewId: joi.string().required(),
    comment: joi.string(),
    rating: joi.number(),
});

export const deleteReviewSchema = joi.object({
     productId: joi.string().required(),
     reviewId: joi.string().required(),
});