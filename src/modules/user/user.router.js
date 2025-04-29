import { Router } from "express";
import * as controller from './user.controller.js';
import * as schema from './user.validation.js';
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import fileUpload, { fileValidation } from "../../utils/multer.js";


const router = Router();
// url/users
router.get('/' ,auth(['super_Admin']), asyncHandler(controller.getAllUsers));
// url/users/active
router.get('/active' ,auth(['super_Admin']), asyncHandler(controller.getActiveUsers));
// url/users/inactive
router.get('/inactive' ,auth(['super_Admin']), asyncHandler(controller.getInactiveUsers));
// url/users/:id
router.get('/:id' ,auth(['super_Admin']),validation(schema.getUserDetailsSchema), asyncHandler(controller.getUserDetails));
// url/users/status/:id
router.put('/status/:id',auth(['super_Admin']),validation(schema.changeUserStatusSchema), asyncHandler(controller.changeUserStatus));
// url/users/:id
router.put('/:id',auth(['super_Admin','admin', 'delivery_Agent' , 'user']),validation(schema.updateUserSchema), asyncHandler(controller.updateUser));
// url/users/image/:id
router.put('/image/:id',auth(['super_Admin','admin', 'delivery_Agent' , 'user']),fileUpload(fileValidation.image).fields([
    {name:"userImage" , maxCount:1}
])
,validation(schema.updateUserImageSchema), asyncHandler(controller.updateUserImage));
// url/users/:id
router.delete('/:id',auth(['super_Admin']),validation(schema.deleteUserSchema), asyncHandler(controller.deleteUser));

export default router;