import { Router } from "express";
import * as controller from './cart.controller.js';
import * as schema from './cart.validation.js';
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";

const router = Router();
// url/cart
router.post('/',auth(['super_Admin','admin', 'delivery_Agent' , 'user']),validation(schema.addToCartSchema), asyncHandler(controller.addToCart));
// url/cart
router.delete('/',auth(['super_Admin','admin', 'delivery_Agent' , 'user']), asyncHandler(controller.clearCart));
// url/cart/deleteOne
router.delete('/deleteOne',auth(['super_Admin','admin', 'delivery_Agent' , 'user']),validation(schema.deleteFromCartSchema), asyncHandler(controller.deleteFromCart));
// url/cart
router.get('/',auth(['super_Admin','admin', 'delivery_Agent' , 'user']), asyncHandler(controller.getCart));
// url/cart
router.patch('/',auth(['super_Admin','admin', 'delivery_Agent' , 'user']),validation(schema.updateQuantitySchema), asyncHandler(controller.updateQuantity));






export default router;