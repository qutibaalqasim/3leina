import joi from 'joi';



export const createOrderSchema = joi.object({
    couponName: joi.string(),
    address: joi.string(),
    phoneNumber: joi.number(),
});