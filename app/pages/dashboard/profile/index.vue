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
  middleware: "auth",
  layout: "sidebar",
  meta: [
    {
      name: "description",
      content: "Halaman dashboard pengguna yang telah masuk.",
    },
  ],
});
</script>

<template>
  <!-- Konten utama -->
  <div class="w-full max-w-7xl mx-auto">
    <div v-if="isLoggedIn" class="space-y-6">
      <!-- update name -->
      <div
        class="bg-gray-800 rounded-lg text-white shadow-sm border border-gray-700 p-4 sm:p-6"
      >
        <h1>Update Name</h1>
      </div>
      <!-- update password -->
      <div
        class="bg-gray-800 rounded-lg text-white shadow-sm border border-gray-700 p-4 sm:p-6"
      >
        <h1>Update Password</h1>
      </div>
    </div>
  </div>
</template>
