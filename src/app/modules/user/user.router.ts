import express from 'express';
import { UserValidation } from './user.validation';
import validateRequest from '../middlewares/validateRequest';
import { userController } from './user.controller';
const router=express.Router();
router.post(
    '/register',
   validateRequest(UserValidation.userValidationSchema),
   userController.createUser
)
export const userRouter=router;