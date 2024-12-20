import catchAsync from "../utils/catchAsync";
import httpStatus from 'http-status-codes';
import { blogService } from "./blog.service";
import sendResponse from "../utils/sendResponse";

const createBlog=catchAsync(async(req,res)=>{
    const result=
    await blogService.createBlog(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'blogpost is created',
        data:result
    })
})

export const blogController={
    createBlog,
}