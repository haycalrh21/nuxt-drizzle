import { db } from "~~/drizzle.config";
import { posts } from "../../../database/schema";
import { createPostSchema } from "~/schemas/posts";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validasi pakai Zod
  const result = createPostSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors,
    });
  }

  const { title, content } = result.data;

  const user_id = body.user_id; // diasumsikan ini sudah valid (bisa lo validasi juga kalau mau)

  const inserted = await db
    .insert(posts)
    .values({
      title,
      content,
      user_id,
    })
    .returning();

  return inserted[0];
});
