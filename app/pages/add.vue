<!-- pages/add.vue -->
<template>
  <form @submit.prevent="submitPost">
    <input v-model="title" placeholder="Title" />
    <textarea v-model="content" placeholder="Content"></textarea>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
const title = ref("");
const content = ref("");

async function submitPost() {
  await $fetch("/api/posts/create", {
    method: "POST",
    body: { title: title.value, content: content.value },
  });
  title.value = "";
  content.value = "";
}
</script>
