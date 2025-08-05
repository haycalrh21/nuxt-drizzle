<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { authClient } from "@/lib/auth-client";

const route = useRoute();
const sidebarOpen = ref(false);
const isLoggingOut = ref(false);

const session = authClient.useSession();

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
          window.location.href = "/auth/login";
        },
      },
    });
  } catch (error) {
    console.error("Logout error:", error);
    isLoggingOut.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex">
    <!-- Mobile Overlay -->
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
        'fixed lg:static top-0 left-0 z-50 h-screen w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out flex-shrink-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="flex flex-col w-full h-full">
        <!-- Sidebar Header -->
        <div
          class="flex items-center justify-between h-16 px-4 border-b border-gray-700"
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
            <li
              v-for="item in [
                {
                  to: '/dashboard',
                  icon: 'heroicons:squares-2x2',
                  label: 'Dashboard',
                },
                {
                  to: '/dashboard/profile',
                  icon: 'heroicons:user',
                  label: 'Profil',
                },
                {
                  to: '/dashboard/settings',
                  icon: 'heroicons:cog-6-tooth',
                  label: 'Pengaturan',
                },
                { to: '/', icon: 'heroicons:home', label: 'Home' },
              ]"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                class="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                active-class="bg-blue-600 text-white"
                @click="closeSidebar"
              >
                <Icon :name="item.icon" class="w-5 h-5 mr-3 flex-shrink-0" />
                <span class="truncate">{{ item.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Footer -->
        <div class="flex-shrink-0 p-4 border-t border-gray-700">
          <div class="mb-4">
            <p class="text-sm font-semibold text-white">Welcome back,</p>
            <p class="text-sm text-gray-300 truncate">
              {{ session?.data?.user.name || "-" }}
            </p>
            <p class="text-xs text-gray-400 truncate">
              {{ session?.data?.user.email || "-" }}
            </p>
          </div>

          <button
            @click="logout"
            :disabled="isLoggingOut"
            class="relative w-full bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center overflow-hidden group"
          >
            <div
              v-if="isLoggingOut"
              class="absolute inset-0 flex items-center justify-center bg-red-500"
            >
              <Icon name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
              <span class="ml-2">Keluar...</span>
            </div>

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

            <div
              class="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-10"
            ></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Main content wrapper -->
    <div :class="['flex-1 flex flex-col min-w-0 lg:ml-0']">
      <!-- Mobile Header -->
      <div class="lg:hidden bg-gray-800 border-b border-gray-700 p-4">
        <button
          @click="toggleSidebar"
          class="p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-colors"
        >
          <Icon name="heroicons:bars-3" class="w-6 h-6" />
        </button>
      </div>

      <!-- Page Content -->
      <div class="flex-1 p-4 sm:p-6 overflow-auto bg-gray-900">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
