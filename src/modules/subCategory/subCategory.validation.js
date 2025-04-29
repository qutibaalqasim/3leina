import joi from 'joi';


export const createSubCategorySchema = joi.object({
    categoryId: joi.string().required(),
    name: joi.string().required().min(3),
    description: joi.string().min(5),
});