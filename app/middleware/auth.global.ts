// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo, useFetch } from "#imports";
import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.getSession(); // FIX DI SINI

  if (to.path.startsWith("/auth")) {
    if (session?.user) {
      return navigateTo("/dashboard");
    }
    return;
  }

  if (to.path.startsWith("/dashboard")) {
    if (!session?.user) {
      return navigateTo("/auth/login");
    }
  }
});
