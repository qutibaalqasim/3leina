import { Router } from "express";
import * as controller from "./chat.controller.js";
import * as schema from "./chat.validation.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/catchError.js";



const router = Router();
// url/chat/:withUserID
router.get('/:withUserID', auth(['super_Admin','admin', 'delivery_Agent' , 'user']), asyncHandler(controller.getMessages));





export default router;