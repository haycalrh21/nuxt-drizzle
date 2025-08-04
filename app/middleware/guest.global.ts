// middleware/guest.global.ts
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";
import { useAuthClient } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  const UNAUTH_PATHS = ["/auth/login", "/auth/register"];
  if (!UNAUTH_PATHS.includes(to.path)) return;

  const { data: session } = await useAuthClient().useSession(useFetch);
  if (session.value?.user) {
    return navigateTo("/dashboard");
  }
});
