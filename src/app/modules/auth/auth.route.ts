import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../middlewares/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";

const router= Router();
router.post('/register',validateRequest(UserValidation.userValidationSchema),AuthController.register)
router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthController.login);

export const authRoute=router;
