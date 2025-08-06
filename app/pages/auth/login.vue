<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthClient } from "~/composables/useAuth";
import { authClient } from "~/lib/auth-client";
const toast = useToast();
const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

const auth = useAuthClient();
const sessionRef = authClient.useSession();
const session = computed(() => sessionRef.value.data);

const user = computed(() => session.value?.user);

// Optional: cek session saat component mounted
onMounted(async () => {
  try {
    // Refresh session untuk memastikan data terbaru
    await auth.getSession();
  } catch (err) {}
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
      toast.add({
        title: "Login failed",
        description: "Please check your email and password.",
      });
      isLoading.value = false;
      return;
    }

    await authClient.revokeOtherSessions();
    await auth.getSession({
      fetchOptions: {
        onSuccess: () => {
          toast.add({
            title: "Login successful",
            description: "Welcome back!",
            icon: "heroicons:exclamation-circle",
          });
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

definePageMeta({
  layout: "default", // Gunakan layout khusus auth
  middleware: "guest",
});
</script>

<template>
  <div
    class="flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          Masuk ke akun Anda
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              :disabled="isLoading"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Alamat email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              :disabled="isLoading"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Password"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Loading...
            </span>
            <span v-else>Sign In</span>
          </button>
        </div>

        <div class="text-center">
          <NuxtLink
            to="/auth/signup"
            class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            dont have an account? Sign Up
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
