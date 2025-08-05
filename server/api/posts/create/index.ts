import { db } from "~~/drizzle.config";
import { posts } from "../../../database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const inserted = await db
    .insert(posts)
    .values({
      title: body.title,
      content: body.content,
    })
    .returning();

  return inserted[0];
});
