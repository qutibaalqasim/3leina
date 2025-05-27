import { Router } from "express";
import * as controller from "./payment.controller.js";
import * as schema from "./payment.validation.js";
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";



const router = Router();
// url/payment
router.post('/',auth(['super_Admin','admin', 'delivery_Agent' , 'user']), asyncHandler(controller.initiatePayment));
// url/payment/all
router.get('/all', auth(['super_Admin']), asyncHandler(controller.getAllPayments));
// url/payment/user
router.get('/user', auth(['super_Admin','admin', 'delivery_Agent' , 'user']), asyncHandler(controller.getPaymentsByUser));
// url/payment/:id
router.get('/:id', auth(['super_Admin','admin', 'delivery_Agent' , 'user']), asyncHandler(controller.getPaymentById));





export default router;