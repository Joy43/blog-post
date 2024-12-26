import mongoose, { model, Schema } from "mongoose";
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
userSchema.pre('save', async function (next) {

  const user = this; 
  // hashing password and save into DATABASE

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User=mongoose.model<TUser>(
'User',
userSchema
)