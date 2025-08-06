import { db } from "~~/drizzle.config";
import { posts } from "../../../../database/schema";
import { desc, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const param = getRouterParam(event, "userId");
  if (!param) {
    throw createError({
      statusCode: 400,
      message: "userId is required in the route.",
    });
  }

  const userId = String(param); // pasti string, gak undefined

  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.user_id, userId))
    .orderBy(desc(posts.createdAt));

  return allPosts;
});
