import { Router } from "express";
import * as controller from './delivery.controller.js';
import * as schema from './delivery.validation.js';
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/catchError.js";

const router = Router();

router.get('/', auth(['super_Admin']), asyncHandler(controller.getAllDelivery));



export default router;