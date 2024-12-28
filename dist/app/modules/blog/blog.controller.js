"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const blog_service_1 = require("./blog.service");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
/*
------]]-----------------------]]---
            create blog
__]]__________________________]]__
*/
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const userId = user._id;
    if (!userId) {
        res.status(401).json({ success: false, message: 'User ID missing in token' });
        return;
    }
    const blogData = Object.assign(Object.assign({}, req.body), { author: userId });
    const blog = yield blog_service_1.blogService.createBlog(blogData);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Blog created successfully',
        data: blog,
    });
    return;
}));
/*
---------------------------
            all blogs
___________________________
*/
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Query Parameters:", req.query);
    const blogs = yield blog_service_1.blogService.getAllBlogsfromDB(req.query);
    console.log("Fetched Blogs:", blogs);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Blogs fetched successfully",
        data: blogs,
    });
}));
/*
--------------------------------
            delete blog
______________________________
*/
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract the blog ID from the URL params
    const { id } = req.params;
    const result = yield blog_service_1.blogService.deleteBlogFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Blog deleted successfully",
        data: result,
    });
}));
/*
-------------------------------------
 ---------     update ---------
-----------------------------------
*/
const updateblog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // 
    const { title, content } = req.body;
    if (!title && !content) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "At least one field (title or content) is required");
    }
    const result = yield blog_service_1.blogService.updateBlogIntoDB(id, req.body);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found");
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Blog is updated successfully",
        data: result,
    });
}));
exports.blogController = {
    createBlog,
    getAllBlogs,
    updateblog,
    deleteBlog
};
