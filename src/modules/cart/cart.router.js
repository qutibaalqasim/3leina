import { Router } from "express";
import * as controller from './cart.controller.js';
import * as schema from './cart.validation.js';
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";

const router = Router();
// url/cart
router.post('/',auth(['super_Admin','admin', 'delivery_Agent' , 'user']),validation(schema.addToCartSchema), asyncHandler(controller.addToCart));







export default router;