import joi from 'joi';


export const createAdminSchema = joi.object({
    categoryId: joi.string().required(),
    userId: joi.string().required(),
    role: joi.string().valid('admin').required(),
});


export const getAdminDetailsSchema = joi.object({
    adminId: joi.string().required(),
});