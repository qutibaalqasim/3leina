import joi from 'joi';


export const createSchema = joi.object({
    name: joi.string().required().trim(),
    amount: joi.number().required(),
    expireDate: joi.date().required(),
});