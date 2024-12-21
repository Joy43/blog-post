import express from 'express';
import { UserValidation } from './user.validation';
import validateRequest from '../middlewares/validateRequest';
import { userController } from './user.controller';
import auth from '../middlewares/auth';
import { USER_ROLE } from './user.contant';
const router=express.Router();
router.post(
    '/user-create',
   validateRequest(UserValidation.userValidationSchema),
   userController.createUser
)
router.post('/create-admin', validateRequest(UserValidation.userValidationSchema), userController.createUser)
router.get('/',userController.getUser)
router.get('/:userId', userController.getSingleUser)
router.put('/:userId', userController.updateUser)
router.delete('/:userId',auth(USER_ROLE.admin), userController.deleteUser)
export const userRouter=router;