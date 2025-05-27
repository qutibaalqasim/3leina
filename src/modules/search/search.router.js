import { Router } from "express";
import * as controller from "./search.controller.js";
import * as schema from "./search.validation.js";
import { asyncHandler } from "../../utils/catchError.js";
import { auth } from "../../middleware/auth.js";


const router = Router();
// url/search
router.get("/",auth(['super_Admin','admin', 'delivery_Agent' , 'user']), asyncHandler(controller.search));



export default router;