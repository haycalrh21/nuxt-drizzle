<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthClient } from "~/composables/useAuth";

const route = useRoute();
const authClient = useAuthClient();
const sidebarOpen = ref(false);

// Get page title from route meta or default
const pageTitle = computed(() => {
  return route.meta?.title || "Dashboard";
});

// Check if user is logged in for logout button
const { data: session } = await authClient.useSession(useFetch);
const userName = computed(() => session.value?.user?.name ?? "Pengguna");

const isLoggedIn = computed(() => !!session.value?.user);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function closeSidebar() {
  sidebarOpen.value = false;
}

function logout() {
  authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        navigateTo("/auth/login");
      },
    },
  });
}
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
            class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
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
                <svg
                  class="w-5 h-5 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                  ></path>
                </svg>
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
                <svg
                  class="w-5 h-5 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
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
                <svg
                  class="w-5 h-5 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
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
                <svg
                  class="w-5 h-5 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span class="truncate">Home</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Footer area (optional) -->
        <div class="flex-shrink-0 p-4 border-t border-gray-700">
          <h1 class="text-sm font-semibold text-white mb-4 inline-block">
            Welcome back ,
            <span>
              {{ userName }}
            </span>
          </h1>
          <button
            v-if="isLoggedIn"
            @click="logout"
            class="bg-red-500 hover:bg-red-600 text-white mx-auto py-2 px-20 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            Logout
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
              class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700 mr-2"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
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

            <!-- Default logout button -->
            <!-- <button
              v-if="isLoggedIn"
              @click="logout"
              class="bg-red-500 hover:bg-red-600 text-white py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              Logout
            </button> -->
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
