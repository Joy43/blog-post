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
exports.adminService = void 0;
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const blog_model_1 = __importDefault(require("../blog/blog.model"));
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    user.isBlocked = true;
    yield user.save();
    return user;
});
// ----
const deleteBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findByIdAndDelete(blogId);
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found");
    }
    return blog;
});
exports.adminService = {
    blockUser, deleteBlog
};