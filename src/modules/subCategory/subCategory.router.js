import { Router } from "express";
import * as controller from './subCategory.controller.js';
import * as schema from './subCategory.validation.js';
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";


const router = Router();
// url/subCategory
router.post('/:categoryId',auth(['super_Admin', 'admin']),validation(schema.createSubCategorySchema), asyncHandler(controller.createSubCategory));



export default router;