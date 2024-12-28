import mongoose, { Document } from 'mongoose';

export interface TBlog extends Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  isPublished: boolean;
}
   
    
   
