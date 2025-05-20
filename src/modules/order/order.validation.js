import joi from 'joi';



export const createOrderSchema = joi.object({
    couponName: joi.string(),
    address: joi.string(),
    phoneNumber: joi.number(),
});

export const getOrderByStatusSchema = joi.object({
    status: joi.string().valid("pending", "cancelled" ,"confirmed", "onWay", "delivered").required(),
});