import express from 'express';
import { UserValidation } from './user.validation';
import validateRequest from '../middlewares/validateRequest';
import { userController } from './user.controller';
import auth from '../middlewares/auth';
const router=express.Router();
router.post(
    '/user-create',
   validateRequest(UserValidation.userValidationSchema),
   userController.createUser
)

router.get('/',userController.getUser)
router.get('/:userId', userController.getSingleUser)
router.put('/:userId', userController.updateUser)
router.delete('/:userId',auth('admin'), userController.deleteUser)
export const userRouter=router;