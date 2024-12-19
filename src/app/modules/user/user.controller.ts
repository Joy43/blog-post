import httpStatus from 'http-status-codes';
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser=catchAsync(
    async (
        req,
        res,
        next,
      ) => {
const {password,user:userData}=req.body;


const result=await UserServices.createUserIntoDB(
    password,
    userData
    
);
sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'user is created sucessful',
    data:result
})

}
)
export const userController={
    createUser,
}
