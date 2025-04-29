import { Router } from "express";
import * as controller from './category.controller.js';
import * as schema from './category.validation.js';
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/catchError.js";
import validation from "../../middleware/validation.js";


const router = Router();
// url/category
router.post('/', auth(['admin', 'super_Admin']),validation(schema.createCategorySchema), asyncHandler(controller.createCategory));
// url/category
router.get('/', auth(['super_Admin']), asyncHandler(controller.getAllCategories));
// url/category/active
router.get('/active', auth(['super_Admin']), asyncHandler(controller.getActive));
// url/category/inactive
router.get('/inactive', auth(['super_Admin']), asyncHandler(controller.getInactive));
// url/category/:id
router.get('/:id', auth(['super_Admin', 'admin']), validation(schema.getCategoryDetailsSchema), asyncHandler(controller.getCategoryDetails));

export default router;