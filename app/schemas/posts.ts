import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .trim(),
  content: z
    .string()
    .min(1, "Content is required")
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content must be less than 5000 characters")
    .trim(),
  user_id: z.string().min(1, "User ID is required"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
