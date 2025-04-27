import joi from 'joi';



export const registerSchema = joi.object({
    userName: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});