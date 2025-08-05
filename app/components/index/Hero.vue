<!-- components/Hero.vue -->
<template>
  <section
    class="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-30 dark:opacity-20">
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(
            circle at 1px 1px,
            rgba(59, 130, 246, 0.3) 1px,
            transparent 0
          );
          background-size: 50px 50px;
        "
      ></div>
    </div>

    <!-- Floating Elements -->
    <div
      class="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
    ></div>
    <div
      class="absolute top-40 right-10 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"
    ></div>

    <div
      class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24"
    >
      <div class="text-center">
        <!-- Badge -->
        <div
          class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 mb-8 border border-blue-200 dark:border-blue-800"
        >
          <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          New: Version 2.0 is here!
        </div>

        <!-- Main Heading -->
        <h1
          class="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
        >
          Build Amazing
          <span
            class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Digital Products
          </span>
        </h1>

        <!-- Subtitle -->
        <p
          class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Create stunning websites and applications with modern tools, clean
          code, and exceptional user experiences that drive results.
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button
            class="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span class="relative z-10">Get Started</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </button>

          <button
            class="group px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center"
          >
            <svg
              class="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Watch Demo
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div class="text-center">
            <div
              class="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1"
            >
              50K+
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Users</div>
          </div>
          <div class="text-center">
            <div
              class="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1"
            >
              99%
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
          </div>
          <div class="text-center">
            <div
              class="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1"
            >
              24/7
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Support</div>
          </div>
          <div class="text-center">
            <div
              class="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1"
            >
              5★
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Rating</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Wave -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg
        class="w-full h-20 text-gray-50 dark:text-gray-900"
        fill="currentColor"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        ></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
// Hero component logic here if needed
</script>
