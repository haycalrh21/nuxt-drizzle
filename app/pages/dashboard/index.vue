<script setup lang="ts">
import { useAuthClient } from "~/composables/useAuth";
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const authClient = useAuthClient();

const { data: session, isPending } = await authClient.useSession(useFetch);

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
</script>

<template>
  <div class="p-6 max-w-xl mx-auto text-center">
    <template v-if="isLoggedIn">
      <h1 class="text-2xl font-bold mb-4">Halo, {{ userName }}!</h1>
      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </template>

    <template v-else>
      <p>
        Silakan
        <NuxtLink to="/login" class="text-blue-600 underline">login</NuxtLink>
        terlebih dahulu.
      </p>
    </template>
  </div>
</template>
