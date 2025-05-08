import joi from 'joi';


export const createSchema = joi.object({
    name: joi.string().required().trim(),
    amount: joi.number().required(),
    expireDate: joi.date().required(),
});

export const getCouponDetailsSchema = joi.object({
    id: joi.string().required(),
});

export const updateSchema = joi.object({
    id: joi.string().required(),
    name: joi.string().trim(),
    amount: joi.number(),
    expireDate: joi.date(),
    status: joi.string().valid('active', 'inactive'),
});

export const deleteCouponSchema = joi.object({
    id: joi.string().required(),
});