import joi from 'joi';


export const createCategorySchema = joi.object({
    name: joi.string().min(3).required(),
    description: joi.string().min(5).optional(),
});

export const getCategoryDetailsSchema = joi.object({
    id: joi.string().required(),
});

export const changeStatusSchema = joi.object({
    id: joi.string().required(),
    status: joi.string().valid('active', 'inactive').required(),
});