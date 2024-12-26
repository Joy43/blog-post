import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../utils/sendResponse";
import httpStatus from 'http-status-codes';
import catchAsync from "../utils/catchAsync";
// ----------register---------------
const register=async(req:Request,res:Response)=>{
 const result =await AuthService.register(req.body);

 sendResponse(res,{
    success:true,
    message:'user is register sucessfully',
    statusCode:httpStatus.OK,
    
   
    data:result
 })

}

// ---------------- login------

const login=catchAsync(async(req:Request,res:Response)=>{
    const result=await AuthService.login(req.body);

    sendResponse(res,{
       
        success:true,
        message:'login sucessfully',
        statusCode:httpStatus.OK,
        // token:result.token,
        data: {
            token: result.token,
            // user: result.user,
        },
    })
})
export const AuthController={
    register,login
}