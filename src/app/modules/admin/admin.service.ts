
import AppError from "../../errors/AppError";
import httpStatus from "http-status-codes";
import Blog from "../blog/blog.model";
import User from "../user/user.model";

const blockUser = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    user.isBlocked = true;
    await user.save();

    return user;
};

// ----
const deleteBlog = async (blogId: string) => {
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
    }
    return blog;
};

export const adminService={
    blockUser,deleteBlog
}