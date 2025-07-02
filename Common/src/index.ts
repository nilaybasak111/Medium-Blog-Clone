import z from "zod";

// SignUp Input Validation with Zod
export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

// SignIn Input Validation with Zod
export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Create Blog Input Validation with Zod
export const createBlogInput = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

// Update Blog Input Validation with Zod
export const updateBlogInput = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  id: z.string().uuid(),
});

// SignUp Type Inference in Zod
export type SignupInput = z.infer<typeof signupInput>;
// SignIn Type Inference in Zod
export type SigninInput = z.infer<typeof signinInput>;
// Create Blog Type Inference in Zod
export type CreateBlogInput = z.infer<typeof createBlogInput>;
// Update Blog Type Inference in Zod
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
