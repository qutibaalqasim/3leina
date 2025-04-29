import { Router } from "express";
import * as controller from './admin.controller.js';
import * as schema from './admin.validation.js';
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import { asyncHandler } from "../../utils/catchError.js";



const router = Router();

// url/admin
router.put('/:categoryId',auth(['super_Admin']), validation(schema.createAdminSchema), asyncHandler(controller.createAdmin)); 
// url/admin
router.get('/', auth(['super_Admin']), asyncHandler(controller.getAllAdmins));


export default router;