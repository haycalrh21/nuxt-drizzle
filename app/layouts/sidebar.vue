<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthClient } from "~/composables/useAuth";

const route = useRoute();
const authClient = useAuthClient();
const sidebarOpen = ref(false);
const isLoggingOut = ref(false);

// Get page title from route meta or default
const pageTitle = computed(() => {
  return route.meta?.title || "Dashboard";
});

// Check if user is logged in for logout button
const { data: session } = await authClient.useSession(useFetch);
const userName = computed(() => session.value?.user?.name ?? "Pengguna");
const email = computed(() => session.value?.user?.email ?? "Tidak diketahui");

const isLoggedIn = computed(() => !!session.value?.user);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function closeSidebar() {
  sidebarOpen.value = false;
}

async function logout() {
  if (isLoggingOut.value) return;

  isLoggingOut.value = true;

  try {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigateTo("/auth/login");
        },
      },
    });
  } catch (error) {
    console.error("Logout error:", error);
    isLoggingOut.value = false;
  }
}

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex">
    <!-- Mobile sidebar overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 lg:hidden"
      @click="closeSidebar"
    >
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
    </div>

    <!-- Sidebar -->
    <div
      :class="[
        'fixed top-0 left-0 z-50 h-screen w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex lg:flex-shrink-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="flex flex-col w-64 h-full">
        <!-- Sidebar Header -->
        <div
          class="flex items-center justify-between h-16 px-4 border-b border-gray-700 flex-shrink-0"
        >
          <h2 class="text-xl font-semibold text-white">Dashboard</h2>

          <button
            @click="closeSidebar"
            class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-colors"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 mt-2 px-4 overflow-y-auto">
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/dashboard"
                class="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                active-class="bg-blue-600 text-white"
                @click="closeSidebar"
              >
                <Icon
                  name="heroicons:squares-2x2"
                  class="w-5 h-5 mr-3 flex-shrink-0"
                />
                <span class="truncate">Dashboard</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/dashboard/profile"
                class="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                active-class="bg-blue-600 text-white"
                @click="closeSidebar"
              >
                <Icon
                  name="heroicons:user"
                  class="w-5 h-5 mr-3 flex-shrink-0"
                />
                <span class="truncate">Profil</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/settings"
                class="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                active-class="bg-blue-600 text-white"
                @click="closeSidebar"
              >
                <Icon
                  name="heroicons:cog-6-tooth"
                  class="w-5 h-5 mr-3 flex-shrink-0"
                />
                <span class="truncate">Pengaturan</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/"
                class="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                active-class="bg-blue-600 text-white"
                @click="closeSidebar"
              >
                <Icon
                  name="heroicons:home"
                  class="w-5 h-5 mr-3 flex-shrink-0"
                />
                <span class="truncate">Home</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Footer area -->
        <div class="flex-shrink-0 p-4 border-t border-gray-700">
          <div class="mb-4">
            <p class="text-sm font-semibold text-white">Welcome back,</p>
            <p class="text-sm text-gray-300 truncate">{{ userName }}</p>
            <p class="text-xs text-gray-400 truncate">{{ email }}</p>
          </div>

          <button
            v-if="isLoggedIn"
            @click="logout"
            :disabled="isLoggingOut"
            class="relative w-full bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center overflow-hidden group"
          >
            <!-- Loading Spinner -->
            <div
              v-if="isLoggingOut"
              class="absolute inset-0 flex items-center justify-center bg-red-500"
            >
              <Icon name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
              <span class="ml-2">Keluar...</span>
            </div>

            <!-- Normal State -->
            <span
              :class="{
                'opacity-0': isLoggingOut,
                'opacity-100': !isLoggingOut,
              }"
              class="flex items-center transition-opacity"
            >
              <Icon
                name="heroicons:arrow-right-on-rectangle"
                class="w-4 h-4 mr-2"
              />
              Logout
            </span>

            <!-- Hover Effect -->
            <div
              class="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-10"
            ></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Main content area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top bar -->
      <header
        class="bg-gray-800 shadow-sm border-b border-gray-700 flex-shrink-0"
      >
        <div class="flex items-center justify-between h-16 px-4 sm:px-6">
          <!-- Left side -->
          <div class="flex items-center">
            <!-- Mobile menu button -->
            <button
              @click="toggleSidebar"
              class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700 mr-2 transition-colors"
            >
              <Icon name="heroicons:bars-3" class="w-6 h-6" />
            </button>

            <!-- Page title -->
            <h1 class="text-lg sm:text-xl font-semibold text-white truncate">
              {{ pageTitle }}
            </h1>
          </div>

          <!-- Right side actions -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <!-- Custom actions slot -->
            <slot name="header-actions" />
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-4 sm:p-6 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Custom animation for logout button */
@keyframes pulse-red {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
}

.animate-pulse-red {
  animation: pulse-red 2s infinite;
}
</style>
