import joi from 'joi';



export const createSuggestionSchema = joi.object({
    suggestion: joi.string().required(),
});