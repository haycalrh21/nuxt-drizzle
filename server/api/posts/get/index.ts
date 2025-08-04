import { db } from "../../../database/drizzle.config";
import { posts } from "../../../database/schema";
import { desc } from "drizzle-orm"; // ⬅ WAJIB ada

export default defineEventHandler(async () => {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt)); // ⬅ ini benar

  return allPosts;
});
