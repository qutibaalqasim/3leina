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

export const updateUserImageSchema = joi.object({
    id: joi.string().required(),
});

export const deleteUserSchema = joi.object({
    id: joi.string().required(),
});

export const changeUserStatusSchema = joi.object({
    id: joi.string().required(),
    status: joi.string().valid('active', 'inactive').required(),
});

export const ratingUserSchema = joi.object({
    userId: joi.string().required(),
    rating: joi.number().min(1).max(5).required(),
});