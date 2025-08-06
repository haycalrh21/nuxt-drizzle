import { db } from "~~/drizzle.config";
import { posts } from "../../../../database/schema";
import { desc, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const param = getRouterParam(event, "postId");
  if (!param) {
    throw createError({
      statusCode: 400,
      message: "userId is required in the route.",
    });
  }

  const postId = Number(param); // convert to number, not undefined
  const deletedPost = await db
    .delete(posts)
    .where(eq(posts.id, postId))
    .returning();

  return deletedPost;
});
