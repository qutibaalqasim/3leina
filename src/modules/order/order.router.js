import { Router } from "express";
import * as controller from "./order.controller.js";
import * as schema from "./order.validation.js";
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";

const router = Router();

// url/order
router.post('/',auth(['super_Admin','admin', 'delivery_Agent' , 'user']),validation(schema.createOrderSchema),asyncHandler(controller.createOrder));
// url/order/all
router.get('/all', auth(['super_Admin']), asyncHandler(controller.getAllOrders));
// url/order
router.get('/', auth(['super_Admin','admin', 'delivery_Agent' , 'user']), asyncHandler(controller.getUserOrders));
// url/order/confirmed
router.get('/confirm', auth(['delivery_Agent']), asyncHandler(controller.getConfirmedOrders));
// url/order/:status
router.get('/:status', auth(['super_Admin']), validation(schema.getOrderByStatusSchema), asyncHandler(controller.getOrderByStatus));








export default router;