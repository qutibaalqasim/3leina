import { Router } from "express";
import * as controller from './coupon.controller.js';
import * as schema from './coupon.validation.js';
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/catchError.js";
import validation from "../../middleware/validation.js";


const router = Router();

// url/coupon
router.post('/', auth(['super_Admin']),validation(schema.createSchema), asyncHandler(controller.create));
// url/coupon
router.get('/', auth(['super_Admin']), asyncHandler(controller.getAll));
// url/coupon/active
router.get('/active', auth(['super_Admin']), asyncHandler(controller.getActive));
// url/coupon/inactive
router.get('/inactive', auth(['super_Admin']), asyncHandler(controller.getInactive));
// url/coupon/:id
router.get('/:id', auth(['super_Admin']),validation(schema.getCouponDetailsSchema), asyncHandler(controller.getCouponDetails));
// url/coupon/:id
router.put('/:id', auth(['super_Admin']),validation(schema.updateSchema), asyncHandler(controller.updateCoupon));




export default router;