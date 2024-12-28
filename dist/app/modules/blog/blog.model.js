"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Please provide the title of the blog"],
        set: (value) => value.toUpperCase(),
        maxlength: 80,
    },
    content: {
        type: String,
        required: [true, "Please provide the content of the blog"],
    },
    author: {
        ref: 'User',
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
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
});
// Export the model for access another component
const Blog = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;
