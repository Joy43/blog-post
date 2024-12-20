
import { Tblog } from "./blog.interface";
import Blog from "./blog.model";

const createBlog=async(payload:Tblog)=>{
const result=await Blog.create(payload);
return result;

}


export const blogService={
createBlog
}