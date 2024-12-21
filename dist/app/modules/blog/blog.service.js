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
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = __importDefault(require("./blog.model"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// Create blog
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.create(payload);
    const populatedBlog = yield blog_model_1.default.findById(result._id).populate("author");
    return populatedBlog;
});
// Get all blogs
const getAllBlogsfromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy, sortOrder, author } = query;
    const queryObj = {};
    if (search) {
        queryObj.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
        ];
    }
    if (author) {
        queryObj.author = author;
    }
    const sortObj = {};
    if (sortBy) {
        sortObj[sortBy] = sortOrder === "desc" ? -1 : 1;
    }
    const result = yield blog_model_1.default.find(queryObj)
        .sort(sortObj)
        .populate("author", "name email");
    return result;
});
// Delete blog
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findById(id).populate("author");
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found");
    }
    const author = blog.author;
    if (author.status === "blocked") {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "This user is blocked!");
    }
    const result = yield blog_model_1.default.findByIdAndDelete(id);
    return result;
});
// Update blog
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findById(id).populate("author", "status");
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found");
    }
    const author = blog.author;
    if (author.status === "blocked") {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "This user's status is blocked. Updates are not allowed.");
    }
    const result = yield blog_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate("author", "name email");
    return result;
});
exports.blogService = {
    createBlog,
    getAllBlogsfromDB,
    deleteBlogFromDB,
    updateBlogIntoDB,
};
