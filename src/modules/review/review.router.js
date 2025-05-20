import { Router } from "express";
import * as controller from './review.controller.js';
import * as schema from './review.validation.js';
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";


const router = Router({mergeParams:true});


router.post('/',auth(['super_Admin','admin', 'delivery_Agent' , 'user']), validation(schema.addReviewSchema), asyncHandler(controller.addReview));
router.put('/:reviewId', auth(['super_Admin','admin', 'delivery_Agent' , 'user']), validation(schema.updateReviewSchema), asyncHandler(controller.updateReview));
router.delete('/:reviewId',auth(['super_Admin','admin', 'delivery_Agent' , 'user']),validation(schema.deleteReviewSchema), asyncHandler(controller.deleteReview));




export default router;