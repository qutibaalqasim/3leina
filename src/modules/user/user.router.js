import { Router } from "express";
import * as controller from './user.controller.js';
import * as schema from './user.validation.js';
import { asyncHandler } from "../../utils/catchError.js";


const router = Router();

router.get('/' , asyncHandler(controller.getAllUsers));




export default router;