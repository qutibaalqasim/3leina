import { Router } from "express";
import * as controller from './product.controller.js';
import * as schema from './product.validation.js';
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import fileUpload, { fileValidation } from "../../utils/multer.js";
import validation from "../../middleware/validation.js";


const router = Router();
// url/product
router.post('/',auth(['super_Admin','admin', 'delivery_Agent' , 'user']),fileUpload(fileValidation.image).fields([
    {name: "mainImage" , maxCount: 1},
    {name: "subImages" , maxCount: 5}
]),validation(schema.createProductSchema), asyncHandler(controller.createProduct));
//url/product
router.get('/',auth(['super_Admin']),asyncHandler(controller.getAllProducts));
//url/product/active
router.get('/active',auth(['super_Admin']),asyncHandler(controller.getAllActive));
//url/product/inActive
router.get('/inActive',auth(['super_Admin']),asyncHandler(controller.getAllInActive));
//url/product/active/:subCategoryId
router.get('/active/:subCategoryId',auth(['super_Admin','admin','delivery_Agent' , 'user']),validation(schema.getActiveBySubCategoryIdSchema),asyncHandler(controller.getActiveBySubCategoryId));
//url/product/inActive/:subCategoryId
router.get('/inActive/:subCategoryId',auth(['super_Admin','admin']),validation(schema.getInActiveBySubCategoryIdSchema),asyncHandler(controller.getInActiveBySubCategoryId));
// url/product/:productId
router.get('/:productId',auth(['super_Admin','admin','delivery_Agent' , 'user']),validation(schema.getProductDetailsSchema),asyncHandler(controller.getProductDetails));
// url/product/changeStatus/:productId
router.patch('/changeStatus/:productId',auth(['super_Admin','admin']),validation(schema.changeStatusSchema),asyncHandler(controller.changeStatus));
// url/product/:productId
router.put('/:productId',auth(['super_Admin','admin','delivery_Agent','user']),fileUpload(fileValidation.image).fields([
    {name: "mainImage" , maxCount: 1},
    {name: "subImages" , maxCount: 5}
]),validation(schema.updateProductSchema),asyncHandler(controller.updateProduct));
export default router;