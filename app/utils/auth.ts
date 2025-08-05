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
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/get-session") {
        if (!ctx.context.session) {
          return ctx.json({
            session: null,
            user: null,
          });
        }
        return ctx.json(ctx.context.session);
      }
    }),
  },
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
const myPlugin = () => {
  return {
    id: "my-plugin",
    hooks: {
      before: [
        {
          matcher: (context: any) => {
            return context.headers.get("x-my-header") === "my-value";
          },
          handler: createAuthMiddleware(async (ctx) => {
            //do something before the request
            return {
              context: ctx, // if you want to modify the context
            };
          }),
        },
      ],
      after: [
        {
          matcher: (context: any) => {
            return context.path === "/sign-up/email";
          },
          handler: createAuthMiddleware(async (ctx) => {
            return ctx.json({
              message: "Hello World",
            }); // if you want to modify the response
          }),
        },
      ],
    },
  } satisfies BetterAuthPlugin;
};
