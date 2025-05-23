import joi from 'joi';



export const createOrderSchema = joi.object({
    couponName: joi.string(),
    address: joi.string(),
    phoneNumber: joi.number(),
});

export const getOrderByStatusSchema = joi.object({
    status: joi.string().valid("pending", "cancelled" ,"confirmed", "onWay", "delivered").required(),
});

export const cancelledOrderSchema = joi.object({
    orderId: joi.string().required(),
    status: joi.string().valid("cancelled"),
});

export const acceptOrderSchema = joi.object({
    orderId: joi.string().required(),
});

export const changeStatusSchema = joi.object({
    orderId: joi.string().required(),
    status: joi.string().valid("cancelled" ,"confirmed", "onWay"),
});

export const deliveredOrderSchema = joi.object({
    orderId: joi.string().required(),
    status: joi.string().valid("delivered"),
});