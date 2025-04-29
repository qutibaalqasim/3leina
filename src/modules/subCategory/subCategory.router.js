import { Router } from "express";
import * as controller from './subCategory.controller.js';
import * as schema from './subCategory.validation.js';
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";


const router = Router();
// url/subCategory
router.post('/:categoryId',auth(['super_Admin', 'admin']),validation(schema.createSubCategorySchema), asyncHandler(controller.createSubCategory));
// url/subCategory
router.get('/', auth(['super_Admin']), asyncHandler(controller.getAllSubCategory));
// url/subCategory/active
router.get('/active', auth(['super_Admin']), asyncHandler(controller.getAllActive));
// url/subCategory/inactive
router.get('/inactive', auth(['super_Admin']), asyncHandler(controller.getAllInactive));
// url/subCategory/:categoryId
router.get('/:categoryId', auth(['super_Admin', 'admin']), validation(schema.getSubCategoriesByCategoryIdSchema), asyncHandler(controller.getSubCategoriesByCategoryId));

export default router;