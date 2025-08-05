<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
  >
    <!-- Navigation -->
    <Navbar :logo="siteConfig.name" />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <Footer
      :company-name="siteConfig.name"
      :company-description="siteConfig.description"
    />
  </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

// Site configuration - easily customizable
const siteConfig = {
  name: "YourCompany",
  description:
    "Building amazing digital experiences with modern technology and creative solutions.",
};

// Optional: Add meta tags, SEO, etc.
useHead({
  titleTemplate: "%s - " + siteConfig.name,
  meta: [
    { name: "description", content: siteConfig.description },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});
</script>
