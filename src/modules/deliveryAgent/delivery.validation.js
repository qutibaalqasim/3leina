import joi from 'joi';



export const createDeliverySchema = joi.object({
    id: joi.string().required(),
    role: joi.string().valid('delivery_Agent').required(),
});


