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




export default router;