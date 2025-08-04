<script setup lang="ts">
import { ref } from "vue";
import { useAuthClient } from "~/composables/useAuth";

const email = ref("");
const password = ref("");
const error = ref("");

const auth = useAuthClient();

async function login() {
  const res = await auth.signIn.email({
    email: email.value,
    password: password.value,
  });
  if (res.error) {
    error.value = res.error.message ?? "Login gagal";
    return;
  }
  await auth.getSession({ query: { disableCookieCache: true } });
  return navigateTo("/dashboard");
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
        class="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
      />

      <button
        type="submit"
        class="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 transition"
      >
        Login
      </button>

      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

      <NuxtLink
        to="/auth/signup"
        class="block text-center text-blue-600 hover:underline"
      >
        Belum punya akun? Daftar
      </NuxtLink>
    </form>
  </div>
</template>
