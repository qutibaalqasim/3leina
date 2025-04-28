import { Router } from "express";
import * as controller from './user.controller.js';
import * as schema from './user.validation.js';
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import fileUpload, { fileValidation } from "../../utils/multer.js";


const router = Router();

router.get('/' ,auth(['super_Admin']), asyncHandler(controller.getAllUsers));
router.get('/active' ,auth(['super_Admin']), asyncHandler(controller.getActiveUsers));
router.get('/:id' ,auth(['super_Admin']),validation(schema.getUserDetailsSchema), asyncHandler(controller.getUserDetails));
router.put('/:id',auth(['super_Admin','admin', 'delivery_Agent' , 'user']),validation(schema.updateUserSchema), asyncHandler(controller.updateUser));
router.put('/image/:id',auth(['super_Admin','admin', 'delivery_Agent' , 'user']),fileUpload(fileValidation.image).fields([
    {name:"userImage" , maxCount:1}
])
,validation(schema.updateUserImageSchema), asyncHandler(controller.updateUserImage));
router.delete('/:id',auth(['super_Admin']),validation(schema.deleteUserSchema), asyncHandler(controller.deleteUser));

export default router;