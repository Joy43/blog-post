import catchAsync from "../utils/catchAsync";

import { blogService } from "./blog.service";
import sendResponse from "../utils/sendResponse";
import AppError from "../../errors/AppError";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes';

/* 
------]]-----------------------]]---
            create blog
__]]__________________________]]__
*/


const createBlog = catchAsync(async (req, res) => {
    const user = req.user as JwtPayload;
    const userId = user._id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'User ID missing in token' });
      return; 
    }
  
    const blogData = { ...req.body, author: userId };
    const blog = await blogService.createBlog(blogData);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
    return;
  });
  


/* 
---------------------------
            all blogs
___________________________
*/
const getAllBlogs = catchAsync(async (req, res) => {
    console.log("Query Parameters:", req.query);  
    const blogs = await blogService.getAllBlogsfromDB(req.query);
    console.log("Fetched Blogs:", blogs);  
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
    // Extract the blog ID from the URL params
    const { id } = req.params; 

    const result = await blogService.deleteBlogFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog deleted successfully",
        data: result,
    });
});


/* 
-------------------------------------
 ---------     update ---------
-----------------------------------
*/
const updateblog = catchAsync(async (req, res) => {
    const { id } = req.params;

    // 
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
