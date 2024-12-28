
import Blog from "./blog.model";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status-codes';
import { TBlog } from './blog.interface';


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

// -----------------Create Blog -----------------------
const createBlog = async (payload: TBlog) => {
    const blog = await Blog.create(payload);
    return Blog.findById(blog._id).populate('author');
  };



//---------------- Get All Blogs ----------------
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

    console.log("Query Object:", queryObj);  
    const blogs = await Blog.find(queryObj).sort(sortObj).populate("author", "name email");
    console.log("Blogs Retrieved:", blogs);  
    return blogs;
};


//------------- Delete Blog----------------
const deleteBlogFromDB = async (id: string) => {
    const blog = await Blog.findById(id).populate("author");
    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found.");
    }

    const author = blog.author as unknown as AuthorType;
    if (author.status === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "This user is blocked.");
    }

    return Blog.findByIdAndDelete(id);
};

// Update Blog
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
    const blog = await Blog.findById(id).populate("author", "status");

    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found.");
    }

    const author = blog.author as unknown as AuthorType;
    if (author.status === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "Updates not allowed: User is blocked.");
    }

    return Blog.findOneAndUpdate({ _id: id }, payload, { new: true }).populate("author", "name email");
};

export const blogService = {
    createBlog,
    getAllBlogsfromDB,
    deleteBlogFromDB,
    updateBlogIntoDB
};