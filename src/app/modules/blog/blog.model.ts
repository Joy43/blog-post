import { Schema, model } from "mongoose";
import { Tblog } from './blog.interface';

const blogSchema = new Schema<Tblog>(
    {
        title: {
            type: String,
            required: [true, "Please provide the title of the blog"],
            set: (value: string) => value.toUpperCase(),
            maxlength: 80,
        },
        content: {
            type: String,
            required: [true, "Please provide the content of the blog"],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide the author of the blog"],
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
       
    },
   /* 
     Automatically adds `createdAt` and `updatedAt` fields
   */
    {
        timestamps: true, 
    }
);

// Export the model for access another component
const Blog = model<Tblog>("Blog", blogSchema);
export default Blog;
