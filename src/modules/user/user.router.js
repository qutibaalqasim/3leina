import { Router } from "express";
import * as controller from './user.controller.js';
import * as schema from './user.validation.js';
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";


const router = Router();

router.get('/' ,auth(['super_Admin']), asyncHandler(controller.getAllUsers));
router.get('/active' ,auth(['super_Admin']), asyncHandler(controller.getActiveUsers));
router.get('/:id' ,auth(['super_Admin']),validation(schema.getUserDetailsSchema), asyncHandler(controller.getUserDetails));




export default router;