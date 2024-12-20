import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../middlewares/validateRequest";
import { UserValidation } from "../user/user.validation";

const router= Router();
router.post('/register',validateRequest(UserValidation.userValidationSchema),AuthController.register)

export const authRoute=router;
