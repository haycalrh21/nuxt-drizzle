<script setup lang="ts">
import { ref } from "vue";
import { useAuthClient } from "~/composables/useAuth";

const auth = useAuthClient();
const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

async function register() {
  error.value = "";
  const res = await auth.signUp.email({
    name: name.value,
    email: email.value,
    password: password.value,
  });
  if (res.error) {
    error.value = res.error.message ?? "Unknown error";
  } else {
    navigateTo("/auth/login");
  }
}
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900"
  >
    <form
      @submit.prevent="register"
      class="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800"
    >
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white text-center">
        Daftar Akun
      </h1>

      <input
        v-model="name"
        type="text"
        placeholder="Nama"
        class="w-full rounded border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
      />
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
        Daftar
      </button>

      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

      <NuxtLink
        to="/auth/login"
        class="block text-center text-blue-600 hover:underline"
      >
        Sudah punya akun? Login
      </NuxtLink>
    </form>
  </div>
</template>
