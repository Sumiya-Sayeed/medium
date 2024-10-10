import { z } from 'zod';

export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export type SignUpInput = z.infer<typeof signUpInput>;

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInInput = z.infer<typeof signInInput>;

export const createPost = z.object({
  title: z.string().min(10).max(200),
  content: z.string().min(100).max(5000),
  authorId: z.string(),
});

export type CreatePost = z.infer<typeof createPost>;

export const updatePost = z.object({
  title: z.string().min(10).max(200),
  content: z.string().min(100).max(5000),
  id: z.string(),
});

export type UpdatePost = z.infer<typeof updatePost>;
