import { Router } from "express";
import * as controller from './delivery.controller.js';
import * as schema from './delivery.validation.js';
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/catchError.js";
import validation from "../../middleware/validation.js";

const router = Router();

// url/delivery/:id
router.patch('/:id', auth(['super_Admin']), validation(schema.createDeliverySchema), asyncHandler(controller.createDelivery));
// url/delivery
router.get('/', auth(['super_Admin']), asyncHandler(controller.getAllDelivery));
// url/delivery/active
router.get('/active', auth(['super_Admin']), asyncHandler(controller.getActive));
// url/delivery/inactive
router.get('/inactive', auth(['super_Admin']), asyncHandler(controller.getInactive));
// url/delivery/:id
router.get('/:id', auth(['super_Admin']), validation(schema.getDeliveryDetailsSchema), asyncHandler(controller.getDeliveryDetails));




export default router;