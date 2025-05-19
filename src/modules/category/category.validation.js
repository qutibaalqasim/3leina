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

export const updateCategorySchema = joi.object({
    id: joi.string().required(),
    name: joi.string().min(3).required(),
    description: joi.string().min(5).optional(),
});

export const updateImageSchema = joi.object({
    id: joi.string().required(),
});

export const deleteCategorySchema = joi.object({
    categoryId: joi.string().required(),
});