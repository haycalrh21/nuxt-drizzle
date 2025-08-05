<template>
  <footer
    class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="md:col-span-2">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {{ companyName }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {{ companyDescription }}
          </p>

          <!-- Social Links -->
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon :name="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3
            class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider"
          >
            Quick Links
          </h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3
            class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider"
          >
            Contact
          </h3>
          <ul class="space-y-3">
            <li
              v-for="contact in contactInfo"
              :key="contact.type"
              class="flex items-start text-gray-600 dark:text-gray-400"
            >
              <Icon
                :name="contact.icon"
                class="w-4 h-4 mr-2 flex-shrink-0 mt-0.5"
              />
              <span class="text-sm">{{ contact.value }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            © {{ currentYear }} {{ companyName }}. All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <NuxtLink
              v-for="legal in legalLinks"
              :key="legal.name"
              :to="legal.path"
              class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
            >
              {{ legal.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

// Props untuk customization
const props = defineProps({
  companyName: {
    type: String,
    default: "YourCompany",
  },
  companyDescription: {
    type: String,
    default:
      "Building amazing digital experiences with modern technology and creative solutions.",
  },
});

// Computed properties
const currentYear = computed(() => new Date().getFullYear());

// Data arrays
const socialLinks = [
  { name: "Twitter", icon: "mdi:twitter", url: "https://twitter.com" },
  { name: "Facebook", icon: "mdi:facebook", url: "https://facebook.com" },
  { name: "LinkedIn", icon: "mdi:linkedin", url: "https://linkedin.com" },
  { name: "Instagram", icon: "mdi:instagram", url: "https://instagram.com" },
  { name: "GitHub", icon: "mdi:github", url: "https://github.com" },
];

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
  { name: "Blog", path: "/blog" },
];

const contactInfo = [
  { type: "email", icon: "heroicons:envelope", value: "hello@yourcompany.com" },
  { type: "phone", icon: "heroicons:phone", value: "+62 123 456 789" },
  { type: "location", icon: "heroicons:map-pin", value: "Jakarta, Indonesia" },
];

const legalLinks = [
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" },
  { name: "Cookie Policy", path: "/cookies" },
];
</script>
