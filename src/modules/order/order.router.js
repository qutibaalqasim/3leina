import { Router } from "express";
import * as controller from "./order.controller.js";
import * as schema from "./order.validation.js";
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";

const router = Router();

// url/order
router.post('/',auth(['super_Admin','admin', 'delivery_Agent' , 'user']),validation(schema.createOrderSchema),asyncHandler(controller.createOrder));









export default router;