import joi from 'joi';


export const createSubCategorySchema = joi.object({
    categoryId: joi.string().required(),
    name: joi.string().required().min(3),
    description: joi.string().min(5),
});

export const getSubCategoriesByCategoryIdSchema = joi.object({
    categoryId: joi.string().required(),
});

export const getAllActiveByCategoryIdSchema = joi.object({
    categoryId: joi.string().required(),
});

export const getAllInActiveByCategoryIdSchema = joi.object({
    categoryId: joi.string().required(),
});

export const changeStatusSchema = joi.object({
    status: joi.string().valid('active', 'inactive').required(),
    subCategoryId: joi.string().required(),
});

export const updateSubCategorySchema = joi.object({
    name: joi.string().required().min(3),
    description: joi.string().min(5),
    subCategoryId: joi.string().required(),
});

export const updateImageSchema = joi.object({
    subCategoryId: joi.string().required(),
});