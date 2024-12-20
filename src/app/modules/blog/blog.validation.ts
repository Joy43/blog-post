import { z } from "zod";

const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({
        invalid_type_error: 'title must be string',
        required_error: 'title is required',
      }).optional(),
      content:z.string({
        invalid_type_error:'content must be string',
        required_error:'content is required',
      }),
      academicFaculty: z.string({
        invalid_type_error: 'Academic faculty must be string',
        required_error: 'Faculty is required',
      }),
    }),
  });