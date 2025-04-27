import { Router } from "express";
import * as controller from "./auth.controller.js";
import { asyncHandler } from "../../utils/catchError.js";
import * as schema from "./auth.validation.js";
import validation from "../../middleware/validation.js";


const router = Router();

router.post('/register',validation(schema.registerSchema), asyncHandler(controller.register));
router.get('/confirmEmail/:token', asyncHandler(controller.confirmEmail));
router.post('/login', validation(schema.loginSchema), asyncHandler(controller.login));
router.post('/sendCode', validation(schema.sendCodeSchema), asyncHandler(controller.sendCode));

export default router;