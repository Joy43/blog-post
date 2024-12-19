import { User } from "./user.model";
import { TUser } from "./user.interface";

const createUserIntoDB = async (password: string, payload: Omit<TUser, 'password'>): Promise<TUser> => {
  // ----------Create user object -----------------
  const user = new User({
    ...payload,
    password,
  });

  // -------------- Save user to the database ------------
  const savedUser = await user.save();

  return savedUser.toObject(); 
};

export const UserServices = {
  createUserIntoDB,
};
