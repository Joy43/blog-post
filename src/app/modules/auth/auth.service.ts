import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import httpStatus from 'http-status-codes';

// ---------- register-------
const register=async(payload:TUser)=>{
    const result=await User.create(payload);
return result;
}
/* 
#######-----------------------------######
            login
#####--------------------------------#######
*/
const login = async (payload: { email: string; password: string }) => {
    // checking user is exist
    const user = await User.findOne({ email: payload?.email }).select('+password');
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND,'This user is not found !')
    }
  
    // checking if the user is blocked
    const status= user?.status
  
    if (status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN,'This user is blocked !')
    }
  
  /* 
  ----------------
  checking  password  correct
  ---------------------
  */
    const isPasswordMatched = await bcrypt.compare(
      payload?.password,
      user?.password
    )
  
    if (!isPasswordMatched) {
      throw new AppError(httpStatus.FORBIDDEN,'Wrong Password 😈! provide correct password ')
    }
  
/* 
---------------------------------------
create token and sent to the  client
----------------------------------------
*/
    const jwtPayload = {
      email: user?.email,
      role: user?.role,
    }
  
    const token = jwt.sign(jwtPayload, "secret", { expiresIn: '25d' });
  
    return {token, user};
  }
export const AuthService={
    register,login
}