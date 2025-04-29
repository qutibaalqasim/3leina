import { Router } from "express";
import * as controller from './subCategory.controller.js';
import * as schema from './subCategory.validation.js';
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import fileUpload, { fileValidation } from "../../utils/multer.js";


const router = Router();
// url/subCategory
router.post('/:categoryId',auth(['super_Admin', 'admin']),validation(schema.createSubCategorySchema), asyncHandler(controller.createSubCategory));
// url/subCategory
router.get('/', auth(['super_Admin']), asyncHandler(controller.getAllSubCategory));
// url/subCategory/active
router.get('/active', auth(['super_Admin']), asyncHandler(controller.getAllActive));
// url/subCategory/inactive
router.get('/inactive', auth(['super_Admin']), asyncHandler(controller.getAllInactive));
// url/subCategory/active/:categoryId
router.get('/active/:categoryId', auth(['super_Admin', 'admin']), validation(schema.getAllActiveByCategoryIdSchema), asyncHandler(controller.getAllActiveByCategoryId));
// url/subCategory/inactive/:categoryId
router.get('/inactive/:categoryId', auth(['super_Admin']), validation(schema.getAllInActiveByCategoryIdSchema), asyncHandler(controller.getAllInActiveByCategoryId));
// url/subCategory/:categoryId
router.get('/:categoryId', auth(['super_Admin', 'admin']), validation(schema.getSubCategoriesByCategoryIdSchema), asyncHandler(controller.getSubCategoriesByCategoryId));
// url/subCategory/:subCategoryId
router.patch('/:subCategoryId', auth(['super_Admin', 'admin']), validation(schema.changeStatusSchema), asyncHandler(controller.changeStatus));
// url/subCategory/update/:subCategoryId
router.put('/update/:subCategoryId', auth(['super_Admin', 'admin']), validation(schema.updateSubCategorySchema), asyncHandler(controller.updateSubCategory));
// url/subCategory/image/:subCategoryId
router.patch('/image/:subCategoryId', auth(['super_Admin', 'admin']),fileUpload(fileValidation.image).fields([
    {name:"image" , maxCount:1}
]) ,validation(schema.updateImageSchema), asyncHandler(controller.updateImage));
export default router;