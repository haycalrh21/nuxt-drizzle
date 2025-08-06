// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";
import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  // Mengambil session via Better Auth client
  const { data: session, isPending } = await authClient.useSession(useFetch);

  if (isPending) return; // tunggu dulu kalau kondisi masih loading

  if (session?.value?.session.token) {
    return navigateTo("/dashboard");
  }
});
