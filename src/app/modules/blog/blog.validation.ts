import { z } from "zod";

const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({
        invalid_type_error: 'title must be string',
        required_error: 'title is required',
      }),
      content:z.string({
        invalid_type_error:'content must be string',
        required_error:'content is required',
      }),
     
    }),
  });

  //  --------- update validation----------

  const updateBlogValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
    }),
});


  export const blogValidation={
    createBlogValidationSchema,
    updateBlogValidationSchema
  }