import joi from 'joi';



export const createSuggestionSchema = joi.object({
    suggestion: joi.string().required(),
});

export const deleteSuggestionSchema = joi.object({
    id: joi.string().required(),
});

export const updateSuggestionSchema = joi.object({
    id: joi.string().required(),
    suggestion: joi.string(),
});