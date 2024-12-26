import catchAsync from "../utils/catchAsync";
import httpStatus from 'http-status-codes';
import { blogService } from "./blog.service";
import sendResponse from "../utils/sendResponse";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";

import { JwtPayload } from "jsonwebtoken";



/* 
--------------------------------
            create blog
______________________________
*/


const createBlog = catchAsync(async (req, res) => {
    console.log('Payload received:', req.body);

    // Extract userId from the Authorization token
    const user = req.user as JwtPayload; 
    const userId = user.id;

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
        throw new AppError(httpStatus.FORBIDDEN, 'Invalid user: User does not exist');
    }

    // Merge `author` with the request body
    const blogData = { ...req.body, author: userId };

    // Create the blog
    const result = await blogService.createBlog(blogData);

    // Send response
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Blog post created successfully',
        data: result
    });
});


/* 
--------------------------------
            all blogs
______________________________
*/
const getAllBlogs = catchAsync(async (req, res) => {
    const blogs = await blogService.getAllBlogsfromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blogs fetched successfully",
        data: blogs,
    });
});

/* 
--------------------------------
            delete blog
______________________________
*/

const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params; // Extract the blog ID from the URL params

    const result = await blogService.deleteBlogFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog deleted successfully",
        data: result,
    });
});


/* 

update

*/
const updateblog = catchAsync(async (req, res) => {
    const { id } = req.params;

    // Validate the payload (optional, if not already handled by middleware)
    const { title, content } = req.body;

    if (!title && !content) {
        throw new AppError(httpStatus.BAD_REQUEST, "At least one field (title or content) is required");
    }

    const result = await blogService.updateBlogIntoDB(id, req.body);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog is updated successfully",
        data: result,
    });
});

  

export const blogController = {
    createBlog,
    getAllBlogs,
    updateblog,
    deleteBlog
   
};
