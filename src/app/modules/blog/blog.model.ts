import mongoose, { Schema } from "mongoose";
import { TBlog } from "./blog.interface";
const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true, maxlength: 100 },
    content: { type: String, required: true, minlength: 10 },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);
  
  export default mongoose.model<TBlog>('Blog', blogSchema);
