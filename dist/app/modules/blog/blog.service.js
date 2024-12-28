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
exports.blogService = void 0;
const blog_model_1 = __importDefault(require("./blog.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// -----------------Create Blog -----------------------
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.create(payload);
    return blog_model_1.default.findById(result._id).populate('author');
});
// Get All Blogs
const getAllBlogsfromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy, sortOrder, author } = query;
    const queryObj = {};
    if (search) {
        queryObj.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } }
        ];
    }
    if (author) {
        queryObj.author = author;
    }
    const sortObj = {};
    if (sortBy) {
        sortObj[sortBy] = sortOrder === "desc" ? -1 : 1;
    }
    return blog_model_1.default.find(queryObj).sort(sortObj).populate("author", "name email");
});
// Delete Blog
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findById(id).populate("author");
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found.");
    }
    const author = blog.author;
    if (author.status === "blocked") {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "This user is blocked.");
    }
    return blog_model_1.default.findByIdAndDelete(id);
});
// Update Blog
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findById(id).populate("author", "status");
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found.");
    }
    const author = blog.author;
    if (author.status === "blocked") {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Updates not allowed: User is blocked.");
    }
    return blog_model_1.default.findOneAndUpdate({ _id: id }, payload, { new: true }).populate("author", "name email");
});
exports.blogService = {
    createBlog,
    getAllBlogsfromDB,
    deleteBlogFromDB,
    updateBlogIntoDB
};
