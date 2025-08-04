import { defineNuxtRouteMiddleware, navigateTo } from "#imports";
import { useAuthClient } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (!["/auth/login", "/auth/register"].includes(to.path)) return;

  const sessionObj = await useAuthClient().useSession(useFetch);
  const user = sessionObj.value?.user;
  if (user) return navigateTo("/dashboard");
});
