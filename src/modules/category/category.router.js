import { Router } from "express";
import * as controller from './category.controller.js';
import * as schema from './category.validation.js';
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/catchError.js";


const router = Router();

router.post('/', auth(['admin', 'super_Admin']), asyncHandler(controller.createCategory));



export default router;