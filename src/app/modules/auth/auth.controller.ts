import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../utils/sendResponse";
import httpStatus from 'http-status-codes';
import catchAsync from "../utils/catchAsync";
// ----------register---------------
const register=async(req:Request,res:Response)=>{
 const result =await AuthService.register(req.body);

 sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'user is register sucessfully',
    data:result
 })

}

// ---------------- login------

const login=catchAsync(async(req:Request,res:Response)=>{
    const result=await AuthService.login(req.body);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'login sucessfully',
        token:result.token,
        data:result.user,
    })
})
export const AuthController={
    register,login
}