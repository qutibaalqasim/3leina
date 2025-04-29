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