// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";
import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  const session = await authClient.getSession();

  const isLoggedIn = !!session?.data?.user;

  const isAuthPage = to.path.startsWith("/auth");
  const isDashboardPage = to.path.startsWith("/dashboard");

  if (isAuthPage && isLoggedIn) {
    return navigateTo("/dashboard"); // kalau udah login, blok akses ke /auth/*
  }

  if (isDashboardPage && !isLoggedIn) {
    return navigateTo("/auth/login"); // kalau belum login, blok akses ke dashboard
  }
});
