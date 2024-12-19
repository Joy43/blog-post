import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

// -----------user schema--------------
const userSchema=new Schema<TUser>(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
          },
          password: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
          },
          isBlocked: {
            type: Boolean,
            default: false,
          },
          isDeleted: {
            type: Boolean,
            default: false,
          },
    },
    {
        timestamps:true,
    }
);
// ---------password encrioted with hash-----------
userSchema.pre('save',async function (next) {
    const user=this;
    if(this.isModified('password')){
       user.password=await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
       )
    }
    
});

export const User=model<TUser>('User',userSchema);