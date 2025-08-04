// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";
import { useAuthClient } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith("/dashboard")) return;
  const { data: session } = await useAuthClient().useSession(useFetch);
  if (!session.value?.user) {
    return navigateTo("/auth/login");
  }
});
