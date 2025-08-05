<script setup lang="ts">
import { useAuthClient } from "~/composables/useAuth";
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const authClient = useAuthClient();

const { data: session } = await authClient.useSession(useFetch);

const isLoggedIn = computed(() => !!session.value?.user);
const userName = computed(() => session.value?.user?.name ?? "Pengguna");

function logout() {
  authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        router.push("/auth/login");
      },
    },
  });
}

definePageMeta({
  title: "Profile",

  layout: "dashboard-sidebar",
  meta: [
    {
      name: "description",
      content: "Halaman dashboard pengguna yang telah masuk.",
    },
  ],
});
</script>

<template>
  <div><h1>settings</h1></div>
</template>
