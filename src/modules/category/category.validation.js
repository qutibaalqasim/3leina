import joi from 'joi';


export const createCategorySchema = joi.object({
    name: joi.string().min(3).required(),
    description: joi.string().min(5).optional(),
});