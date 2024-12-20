import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../utils/sendResponse";
import httpStatus from 'http-status-codes';

const register=async(req:Request,res:Response)=>{
 const result =await AuthService.register(req.body);

 sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'user is register sucessfully',
    data:result
 })

}
export const AuthController={
    register
}