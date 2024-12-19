import { z } from 'zod';
const userValidationSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    user: z.object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z.string().email({ message: "Invalid email format" }),
    }),
  });
  
  export const UserValidation = {
    userValidationSchema,
  };
  