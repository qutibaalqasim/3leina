import { Router } from "express";
import * as controller from './favorite.controller.js';
import * as schema from './favorite.validation.js';
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/catchError.js";
import validation from "../../middleware/validation.js";



const router = Router();

//url/favorite
router.post('/', auth(['super_Admin','admin', 'delivery_Agent' , 'user']),validation(schema.addToFavoriteSchema), asyncHandler(controller.addToFavorite));
//url/favorite
router.get('/', auth(['super_Admin','admin', 'delivery_Agent' , 'user']), asyncHandler(controller.getFavorite));
//url/favorite
router.delete('/', auth(['super_Admin','admin', 'delivery_Agent' , 'user']), asyncHandler(controller.clearFavorite));
//url/favorite
router.delete('/deleteOne', auth(['super_Admin','admin', 'delivery_Agent' , 'user']),validation(schema.deleteFromFavoriteSchema), asyncHandler(controller.deleteFromFavorite));



export default router;