import { Router } from "express";
import * as controller from './favorite.controller.js';
import * as schema from './favorite.validation.js';
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/catchError.js";



const router = Router();

//url/favorite
router.post('/', auth(['super_Admin','admin', 'delivery_Agent' , 'user']), asyncHandler(controller.addToFavorite));




export default router;