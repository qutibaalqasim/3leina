import { Router } from "express";
import * as controller from './user.controller.js';
import * as schema from './user.validation.js';
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";


const router = Router();

router.get('/' ,auth(['super_Admin']), asyncHandler(controller.getAllUsers));
router.get('/active' ,auth(['super_Admin']), asyncHandler(controller.getActiveUsers));




export default router;