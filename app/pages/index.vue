<template>
  <div class="space-y-10">
    <!-- Form Tambah Post -->
    <form
      @submit.prevent="submitPost"
      class="space-y-4 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 border dark:border-gray-700"
    >
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
        Tambah Post
      </h2>
      <input
        v-model="title"
        type="text"
        placeholder="Judul"
        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring focus:border-blue-400"
      />
      <textarea
        v-model="content"
        placeholder="Konten"
        rows="4"
        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring focus:border-blue-400"
      ></textarea>
      <button
        type="submit"
        class="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Simpan
      </button>
    </form>

    <!-- List Posts -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
        Daftar Post
      </h2>
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border dark:border-gray-700 hover:shadow-md transition"
      >
        <div class="flex items-start justify-between mb-2">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ post.title }}
          </h3>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(post.createdAt) }}
          </span>
        </div>
        <p class="text-gray-700 dark:text-gray-200 whitespace-pre-line">
          {{ post.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const title = ref("");
const content = ref("");
interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const posts = ref<Post[]>([]);

const fetchPosts = async () => {
  posts.value = await $fetch("/api/posts/get");
};

async function submitPost() {
  if (!title.value.trim()) return;

  await $fetch("/api/posts/create", {
    method: "POST",
    body: {
      title: title.value,
      content: content.value,
    },
  });

  title.value = "";
  content.value = "";
  await fetchPosts();
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

onMounted(fetchPosts);
</script>
