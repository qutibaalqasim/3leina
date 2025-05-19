import { Router } from "express";
import * as controller from './suggestion.controller.js';
import * as schema from './suggestion.validation.js';
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import fileUpload, { fileValidation } from "../../utils/multer.js";


const router = Router();

//url/suggestion
router.post('/',auth(['admin', 'delivery_Agent' , 'user']),
fileUpload(fileValidation.image).fields([
    {name: "image" , maxCount: 1},
]),
validation(schema.createSuggestionSchema),
asyncHandler(controller.createSuggestion));
//url/suggestion
router.get('/',auth(['super_Admin']), asyncHandler(controller.getAllSuggestion));
//url/suggestion/:id
router.delete('/:id',auth(['admin', 'delivery_Agent' , 'user']),validation(schema.deleteSuggestionSchema),asyncHandler(controller.deleteSuggestion));
// url/suggestion/:id
router.put('/:id',auth(['admin', 'delivery_Agent' , 'user']),
fileUpload(fileValidation.image).fields([
    {name: "image" , maxCount: 1},
]),validation(schema.updateSuggestionSchema), asyncHandler(controller.updateSuggestion));




export default router;