import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~~/server/database/drizzle.config";
import {
  user,
  account,
  session,
  verification,
} from "~~/server/database/schema";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      session,
      verification,
    },
    // gunakana ini jika nama tabel jamak, misal  `users` → `user`
    // usePlural: true,
  }),
});
