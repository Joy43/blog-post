


import AppError from "../../errors/AppError";
import { Tblog } from "./blog.interface";
import Blog from "./blog.model";
import httpStatus from 'http-status-codes';

const createBlog=async(payload:Tblog)=>{
const result=await Blog.create(payload);
const populatedBlog = await Blog.findById(result._id).populate("author");
    return populatedBlog;

}

// --------get all blog------
const getAllBlogsfromDB = async (query: any) => {
    const { search, sortBy, sortOrder, author } = query;

    // Build the query object
    const queryObj: any = {};
    if (search) {
        queryObj.$or = [
            { title: { $regex: search, $options: "i" } }, // Case-insensitive search
            { content: { $regex: search, $options: "i" } }
        ];
    }
    if (author) {
        queryObj.author = author;
    }

    // Build the sort object
    const sortObj: any = {};
    if (sortBy) {
        sortObj[sortBy] = sortOrder === "desc" ? -1 : 1; // Sort order: asc = 1, desc = -1
    }

    // Execute the query with sorting and populate
    const result = await Blog.find(queryObj)
        .sort(sortObj)
        .populate("author", "name email"); // Populating only selected fields

    return result;
};

/* 
-------------------------------------
delete blog
-------------------------------------

*/

const deleteBlogFromDB = async (id: string) => {
    const result = await Blog.findByIdAndDelete(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
    }
    return result;
};


  /* 
  ---------------------------
  update service
----------------------------
  */

  const updateBlogIntoDB = async (
    id: string,
    payload: Partial<Tblog>,
) => {
    const result = await Blog.findOneAndUpdate(
        { _id: id },
        payload,
        // Returns the updated document
        { new: true } 
        // Populate the author field with selected fields
    ).populate("author", "name email"); 
    return result;
};


export const blogService={
createBlog,
getAllBlogsfromDB,
deleteBlogFromDB,
updateBlogIntoDB
}