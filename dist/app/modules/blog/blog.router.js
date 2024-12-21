"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_contant_1 = require("../user/user.contant");
const router = (0, express_1.Router)();
// ------crate all blog------
router.post('/create-blog', (0, auth_1.default)(user_contant_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.blogValidation.createBlogValidationSchema), blog_controller_1.blogController.createBlog);
// ------get all blog-----
router.get('/', blog_controller_1.blogController.getAllBlogs);
// -----delete--------
router.delete('/:id', (0, auth_1.default)(user_contant_1.USER_ROLE.user), blog_controller_1.blogController.deleteBlog);
// --------update-----
router.patch('/:id', (0, auth_1.default)(user_contant_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.blogValidation.updateBlogValidationSchema), blog_controller_1.blogController.updateblog);
exports.blogRouter = router;
