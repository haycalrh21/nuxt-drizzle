import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Fix deprecated process.server
  if (import.meta.server) return;

  try {
    const { data: session } = await authClient.useSession(useFetch);

    // DEBUG - cek ini di browser console
    console.log("🔍 DEBUG AUTH MIDDLEWARE:");
    console.log("Current path:", to.path);
    console.log("From path:", from?.path);
    console.log("Session:", session.value);
    console.log("User:", session.value?.user);
    console.log("Has user?", !!session.value?.user);

    const hasUser = !!session.value?.user;

    // Route yang butuh login
    const needsAuth = ["/dashboard", "/profile", "/settings"].some((route) =>
      to.path.startsWith(route)
    );

    // Auth pages yang tidak boleh diakses kalau sudah login
    const isAuthPage = ["/auth/login", "/auth/signup", "/auth"].some((route) =>
      to.path.startsWith(route)
    );

    console.log("Needs auth?", needsAuth);
    console.log("Is auth page?", isAuthPage);

    // Belum login tapi coba akses protected route
    if (needsAuth && !hasUser) {
      console.log("❌ Redirecting to login - not authenticated");
      return navigateTo("/auth/login");
    }

    // Sudah login tapi coba akses auth pages - REDIRECT KE DASHBOARD
    if (hasUser && isAuthPage) {
      console.log("✅ Redirecting to dashboard - already authenticated");
      return navigateTo("/dashboard");
    }

    console.log("🟢 Middleware passed");
  } catch (error) {
    console.error("❌ Auth middleware error:", error);
    // Kalau ada error, biarkan user tetap di halaman yang diminta
  }
});
