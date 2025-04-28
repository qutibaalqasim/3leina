import joi from 'joi';



export const getUserDetailsSchema = joi.object({
    id: joi.string().required(),
});

export const updateUserSchema = joi.object({
    id: joi.string().required(),
    userName: joi.string().min(3).max(30),
    email: joi.string().email(),
    password: joi.string().min(6),
    phone: joi.string().min(10).max(15),
    address: joi.string().min(5).max(100),
});