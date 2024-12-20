import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// ---------- register-------
const register=async(payload:TUser)=>{
    const result=await User.create(payload);
return result;
}
// ----------login-------
const login = async (payload: { email: string; password: string }) => {
    // checking user is exist
    const user = await User.findOne({ email: payload?.email }).select('+password');
  
    if (!user) {
      throw new Error('This user is not found !')
    }
  
    // checking if the user is blocked
    const status= user?.status
  
    if (status === 'blocked') {
      throw new Error('This user is blocked ! !')
    }
  
    //checking  password  correct
    const isPasswordMatched = await bcrypt.compare(
      payload?.password,
      user?.password
    )
  
    if (!isPasswordMatched) {
      throw new Error('Wrong Password 😈! provide correct password ')
    }
  
    //create token and sent to the  client
    const jwtPayload = {
      email: user?.email,
      role: user?.role,
    }
  
    const token = jwt.sign(jwtPayload, "secret", { expiresIn: '1d' });
  
    return {token, user};
  }
export const AuthService={
    register,login
}