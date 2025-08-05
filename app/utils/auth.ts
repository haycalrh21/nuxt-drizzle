import { betterAuth } from "better-auth";
import type { User, BetterAuthPlugin } from "better-auth";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/plugins";
import { db } from "~~/drizzle.config";
import * as schema from "~~/server/database/schema";
export type UserWithId = Omit<User, "id"> & {
  id: number;
};
export const auth = betterAuth({
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  user: {},

  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema, // INI YANG KURANG ANJING!
    // gunakana ini jika nama tabel jamak, misal  `users` → `user`
    // usePlural: true,
  }),
});
