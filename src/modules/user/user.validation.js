import joi from 'joi';



export const getUserDetailsSchema = joi.object({
    id: joi.string().required(),
});