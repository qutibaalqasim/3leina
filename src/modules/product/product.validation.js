import joi from "joi";



export const createProductSchema = joi.object({
    name: joi.string().required().min(3).max(60),
    description: joi.string().required().min(30),
    price: joi.number().required(),
    stock: joi.number().default(1),
    discount: joi.number().default(0),
    priceAfterDiscount: joi.number(),
    colors: joi.array().items(joi.string()),
    sizes: joi.array().items(joi.string().valid('sm', 'md', 'lg', 'xlg', '2xlg', '3xlg')),
    subCategoryId: joi.string().required(),
});

export const getActiveBySubCategoryIdSchema = joi.object({
    subCategoryId: joi.string().required(),
});

export const getInActiveBySubCategoryIdSchema = joi.object({
    subCategoryId: joi.string().required(),
});

export const getProductDetailsSchema = joi.object({
    productId: joi.string().required(),
});

export const changeStatusSchema = joi.object({
    productId: joi.string().required(),
    status: joi.string().valid('active', 'inactive').required(),
});

export const updateProductSchema = joi.object({
    productId: joi.string().required(),
    name: joi.string().min(3).max(60),
    description: joi.string().min(30),
    price: joi.number(),
    stock: joi.number(),
    discount: joi.number(),
    priceAfterDiscount: joi.number(),
    colors: joi.array().items(joi.string()),
    sizes: joi.array().items(joi.string().valid('sm', 'md', 'lg', 'xlg', '2xlg', '3xlg')),
    subCategoryId: joi.string().required(),
});

export const deleteProductSchema = joi.object({
    productId: joi.string().required(),
});