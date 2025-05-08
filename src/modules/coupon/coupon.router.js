import { Router } from "express";
import * as controller from './coupon.controller.js';
import * as schema from './coupon.validation.js';
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/catchError.js";
import validation from "../../middleware/validation.js";


const router = Router();

// url/coupon
router.post('/', auth(['super_Admin']),validation(schema.createSchema), asyncHandler(controller.create));





export default router;