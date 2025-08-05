<template>
  <Navbar />
  <div class="container">
    <slot />
  </div>
  <Footer />
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

// Site configuration - easily customizable
</script>
