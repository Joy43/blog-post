import { Router } from "express";
import { adminController } from "./admin.controller";
import auth from "../middlewares/auth";
import { USER_ROLE } from "../user/user.contant";

const router=Router()

router.delete("/blogs/:id",auth(USER_ROLE.admin), adminController.deleteBlog);
router.patch("/users/:userId/block", auth(USER_ROLE.admin),adminController.blockUser);

export const AdminRouter=router;