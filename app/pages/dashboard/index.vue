<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const authClient = useAuthClient();

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
  title: "Dashboard",
  // middleware: "auth",
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
  <!-- Konten utama -->
  <div class="w-full max-w-7xl mx-auto">
    <div class="space-y-6">
      <!-- Welcome Card -->
      <div
        class="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4 sm:p-6"
      >
        <p class="text-sm sm:text-base text-gray-300">
          Ini adalah halaman dashboard Anda. Gunakan menu di sebelah kiri untuk
          navigasi.
        </p>
      </div>

      <!-- Stats Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <!-- Card 1 -->
        <div
          class="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4 sm:p-6"
        >
          <div class="flex items-center">
            <div class="p-2 sm:p-3 bg-blue-600 rounded-lg flex-shrink-0">
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                ></path>
              </svg>
            </div>
            <div class="ml-3 sm:ml-4 min-w-0 flex-1">
              <p class="text-xs sm:text-sm font-medium text-gray-400 truncate">
                Total Pengguna
              </p>
              <p class="text-lg sm:text-2xl font-semibold text-white">1,234</p>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div
          class="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4 sm:p-6"
        >
          <div class="flex items-center">
            <div class="p-2 sm:p-3 bg-green-600 rounded-lg flex-shrink-0">
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <div class="ml-3 sm:ml-4 min-w-0 flex-1">
              <p class="text-xs sm:text-sm font-medium text-gray-400 truncate">
                Pendapatan
              </p>
              <p class="text-lg sm:text-2xl font-semibold text-white">
                Rp 45,6M
              </p>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div
          class="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4 sm:p-6 sm:col-span-2 lg:col-span-1"
        >
          <div class="flex items-center">
            <div class="p-2 sm:p-3 bg-yellow-600 rounded-lg flex-shrink-0">
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div class="ml-3 sm:ml-4 min-w-0 flex-1">
              <p class="text-xs sm:text-sm font-medium text-gray-400 truncate">
                Aktivitas
              </p>
              <p class="text-lg sm:text-2xl font-semibold text-white">89%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
        <div class="p-4 sm:p-6 border-b border-gray-700">
          <h3 class="text-base sm:text-lg font-medium text-white">
            Aktivitas Terbaru
          </h3>
        </div>
        <div class="p-4 sm:p-6">
          <div class="space-y-4">
            <!-- Activity Item 1 -->
            <div class="flex items-start sm:items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-white"
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
                </div>
              </div>
              <div class="ml-3 sm:ml-4 min-w-0 flex-1">
                <p class="text-sm font-medium text-white">
                  Pengguna baru bergabung
                </p>
                <p class="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-0">
                  2 menit yang lalu
                </p>
              </div>
            </div>

            <!-- Activity Item 2 -->
            <div class="flex items-start sm:items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-3 sm:ml-4 min-w-0 flex-1">
                <p class="text-sm font-medium text-white">
                  Tugas berhasil diselesaikan
                </p>
                <p class="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-0">
                  5 menit yang lalu
                </p>
              </div>
            </div>

            <!-- Activity Item 3 -->
            <div class="flex items-start sm:items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-3 sm:ml-4 min-w-0 flex-1">
                <p class="text-sm font-medium text-white">Peringatan sistem</p>
                <p class="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-0">
                  10 menit yang lalu
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
