<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthClient } from "~/composables/useAuth";
import { authClient } from "~/lib/auth-client";

const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

const auth = useAuthClient();
const sessionRef = authClient.useSession();
const session = computed(() => sessionRef.value.data);

const user = computed(() => session.value?.user);

// Hapus redirect otomatis di sini - biar middleware yang handle
// if (user) {
//   navigateTo("/dashboard");
// }

// Optional: cek session saat component mounted
onMounted(async () => {
  try {
    // Refresh session untuk memastikan data terbaru
    await auth.getSession();
  } catch (err) {
    console.log("Session check failed:", err);
  }
});

async function login() {
  if (isLoading.value) return; // Prevent double click

  isLoading.value = true;
  error.value = "";

  try {
    const res = await auth.signIn.email({
      email: email.value,
      password: password.value,
      callbackURL: "/dashboard",
    });

    if (res.error) {
      error.value = res.error.message ?? "Login gagal";
      isLoading.value = false;
      return;
    }

    await authClient.revokeOtherSessions();
    await auth.getSession({
      fetchOptions: {
        onSuccess: () => {
          // Biarkan middleware yang handle redirect
          navigateTo("/dashboard");
        },
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    error.value = "Terjadi kesalahan saat login";
    isLoading.value = false;
  }
}
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900"
  >
    <form
      @submit.prevent="login"
      class="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800"
    >
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white text-center">
        Login
      </h1>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        :disabled="isLoading"
        class="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        :disabled="isLoading"
        class="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      />

      <button
        type="submit"
        :disabled="isLoading"
        class="relative w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        <!-- Loading Spinner -->
        <div
          v-if="isLoading"
          class="absolute inset-0 flex items-center justify-center bg-blue-600"
        >
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="ml-2">Masuk...</span>
        </div>

        <!-- Button Text (hidden saat loading) -->
        <span
          :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading }"
          class="transition-opacity"
        >
          Login
        </span>
      </button>

      <p v-if="error" class="text-sm text-red-500 text-center">{{ error }}</p>

      <NuxtLink
        to="/auth/signup"
        class="block text-center text-blue-600 hover:underline transition-all hover:text-blue-700"
      >
        Belum punya akun? Daftar
      </NuxtLink>
    </form>
  </div>
</template>
