import catchAsync from "../utils/catchAsync";
import { adminService } from "./admin.service";
import sendResponse from "../utils/sendResponse";

// -----------
const blockUser = catchAsync(async (req, res) => {
    const { userId } = req.params;

    const blockedUser = await adminService.blockUser(userId); // Retrieve blocked user data

    sendResponse(res, {
        success: true,
        message: "User blocked successfully",
        statusCode: 200,
        data: blockedUser, 
    });
});



// --------blog-----
const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;

    const deletedBlog = await adminService.deleteBlog(id); 

    sendResponse(res, {
        success: true,
        message: "Blog deleted successfully",
        statusCode: 200,
        data: deletedBlog, 
    });
});



export const adminController={
    blockUser,deleteBlog
}