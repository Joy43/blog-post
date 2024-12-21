import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { Tblog } from "./blog.interface";
import Blog from "./blog.model";
import httpStatus from "http-status-codes";

type QueryParams = {
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    author?: string;
};

type AuthorType = {
    _id: string;
    name: string;
    email: string;
    status?: string;
};

// -------------Create blog---------
const createBlog = async (payload: Tblog) => {

    const result = await Blog.create(payload);
    const populatedBlog = await Blog.findById(result._id).populate("author");
    return populatedBlog;
};

// Get all blogs
const getAllBlogsfromDB = async (query: QueryParams) => {
    const { search, sortBy, sortOrder, author } = query;

    const queryObj: Record<string, unknown> = {};
    if (search) {
        queryObj.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
        ];
    }
    if (author) {
        queryObj.author = author;
    }

    const sortObj: Record<string, 1 | -1> = {};
    if (sortBy) {
        sortObj[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const result = await Blog.find(queryObj)
        .sort(sortObj)
        .populate("author", "name email");

    return result;
};

// Delete blog
const deleteBlogFromDB = async (id: string) => {
    const blog = await Blog.findById(id).populate("author");
    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
    }

    const author = blog.author as unknown as AuthorType;
    if (author.status === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
    }

    const result = await Blog.findByIdAndDelete(id);
    return result;
};

// Update blog
const updateBlogIntoDB = async (id: string, payload: Partial<Tblog>) => {
    const blog = await Blog.findById(id).populate("author", "status");

    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
    }

    const author = blog.author as unknown as AuthorType;
    if (author.status === "blocked") {
        throw new AppError(
            httpStatus.FORBIDDEN,
            "This user's status is blocked. Updates are not allowed."
        );
    }

    const result = await Blog.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        }
    ).populate("author", "name email");

    return result;
};

export const blogService = {
    createBlog,
    getAllBlogsfromDB,
    deleteBlogFromDB,
    updateBlogIntoDB,
};
