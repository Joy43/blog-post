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
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const blog_service_1 = require("./blog.service");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
/*
--------------------------------
            create blog
______________________________
*/
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('test payload:', req.body);
    // ---------- author exists--------
    const { author } = req.body;
    const userExists = yield user_model_1.User.findById(author);
    if (!userExists) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'Invalid author: User does not exist');
    }
    const result = yield blog_service_1.blogService.createBlog(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Blog post is created',
        data: result
    });
}));
/*
--------------------------------
            all blogs
______________________________
*/
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_service_1.blogService.getAllBlogsfromDB(req.query);
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
    const { id } = req.params; // Extract the blog ID from the URL params
    const result = yield blog_service_1.blogService.deleteBlogFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Blog deleted successfully",
        data: result,
    });
}));
/*

update

*/
const updateblog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validate the payload (optional, if not already handled by middleware)
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
