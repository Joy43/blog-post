import { Router } from "express";
import { blogController } from "./blog.controller";
import validateRequest from "../middlewares/validateRequest";
import { blogValidation } from "./blog.validation";
import auth from "../middlewares/auth";
import { USER_ROLE } from "../user/user.contant";

const router=Router()
// ------crate all blog------
router.post(
    '/',
    auth('user'), // Protect the route
    validateRequest(blogValidation.createBlogValidationSchema), // Validate request body
    blogController.createBlog // Handle blog creation
)

// ------get all blog-----
router.get('/',blogController.getAllBlogs)

// -----delete--------

router.delete('/:id', auth(USER_ROLE.user), blogController.deleteBlog);

// --------update-----
router.patch('/:id',auth(USER_ROLE.user),validateRequest
    (blogValidation.updateBlogValidationSchema),

blogController.updateblog)
export const blogRouter=router