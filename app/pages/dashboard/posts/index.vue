<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { createPostSchema } from "~/schemas/posts";
import type { ZodError } from "zod";

const toast = useToast();
const router = useRouter();
const authClient = useAuthClient();

const isLoading = ref(false);
const isPostLoading = ref(true); // 🆕 loading posts

const sessionResult = await authClient.getSession();
const session = sessionResult.data;

// Form fields
const title = ref("");
const content = ref("");

// Validation errors
const errors = ref<Record<string, string>>({});

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

function clearErrors() {
  errors.value = {};
}

const posts = ref<Post[]>([]);
const fetchPosts = async () => {
  try {
    isPostLoading.value = true;
    posts.value = await $fetch<Post[]>("/api/posts/get/" + session?.user.id);
    console.log("Fetched posts:", posts.value);
  } catch (err) {
    toast.add({
      title: "Error",
      description: "Failed to load posts.",
      icon: "heroicons:exclamation-circle",
    });
  } finally {
    isPostLoading.value = false;
  }
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

onMounted(fetchPosts);

function setErrors(zodError: ZodError) {
  clearErrors();

  const uniqueFields = new Set<string>();
  zodError.issues.forEach((issue) => {
    const field = issue.path[0];
    if (typeof field === "string") {
      errors.value[field] = issue.message;
      uniqueFields.add(field);
    }
  });

  uniqueFields.forEach((field) => {
    const errorMessage = errors.value[field];
    if (errorMessage) {
      toast.add({
        title: "Validation Error",
        description: errorMessage,
        icon: "heroicons:exclamation-circle",
      });
    }
  });
}

async function submitPost() {
  clearErrors();

  try {
    const validatedData = createPostSchema.parse({
      title: title.value,
      content: content.value,
      user_id: session?.user.id,
    });

    isLoading.value = true;

    await $fetch("/api/posts/create", {
      method: "POST",
      body: validatedData,
    });

    toast.add({
      title: "Success",
      description: "Your post has been created successfully!",
      icon: "heroicons:check-circle",
    });

    title.value = "";
    content.value = "";
    await fetchPosts();
  } catch (error: any) {
    console.error("Error creating post:", error);

    if (error.name === "ZodError") {
      setErrors(error);
      return;
    }

    toast.add({
      title: "Error",
      description:
        error.data?.message || "Failed to create post. Please try again.",
      icon: "heroicons:exclamation-circle",
    });
  } finally {
    isLoading.value = false;
  }
}

async function deletePost(postId: number) {
  try {
    await $fetch(`/api/posts/delete/${postId}`, {
      method: "DELETE",
    });
    toast.add({
      title: "Success",
      description: "Post deleted successfully!",
      icon: "heroicons:check-circle",
    });
    await fetchPosts();
  } catch (error) {
    console.error("Error deleting post:", error);
    toast.add({
      title: "Error",
      description: "Failed to delete post. Please try again.",
      icon: "heroicons:exclamation-circle",
    });
  }
}

definePageMeta({
  title: "Create Post",
  layout: "dashboard-sidebar",
  middleware: "auth",
  meta: [
    {
      name: "description",
      content: "Create a new post.",
    },
  ],
});
</script>

<template>
  <div class="w-full max-w-7xl mx-auto">
    <div class="space-y-6">
      <div
        class="bg-gray-800 rounded-lg text-white shadow-sm border border-gray-700 p-4 sm:p-6"
      >
        <form @submit.prevent="submitPost" class="mt-8 space-y-6">
          <h2 class="text-2xl font-semibold text-white">Tambah Post</h2>

          <div>
            <input
              v-model="title"
              type="text"
              placeholder="Judul"
              :class="[
                'w-full p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-400 transition-colors',
                errors.title ? 'border-red-500' : 'border-gray-600',
              ]"
            />
          </div>

          <div>
            <textarea
              v-model="content"
              placeholder="Konten"
              rows="4"
              :class="[
                'w-full p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-400 transition-colors',
                errors.content ? 'border-red-500' : 'border-gray-600',
              ]"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
          >
            <span v-if="isLoading" class="flex items-center gap-2">
              <Icon name="mdi:loading" class="animate-spin h-5 w-5" />
              Creating...
            </span>
            <span v-else>Submit Post</span>
          </button>
        </form>
      </div>

      <!-- Loading posts spinner -->
      <div v-if="isPostLoading" class="flex justify-center py-10">
        <Icon name="mdi:loading" class="animate-spin h-10 w-10 text-gray-500" />
      </div>

      <!-- Posts list -->
      <div
        v-else
        v-for="post in posts"
        :key="post.id"
        class="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border dark:border-gray-700 hover:shadow-md transition"
      >
        <div class="flex items-start justify-between mb-2">
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ post.title }}
            </h3>
          </div>

          <Button
            @click="deletePost(post.id)"
            class="text-red-500 hover:text-red-600 cursor-pointer"
          >
            <UIcon name="i-heroicons-trash" />
          </Button>
        </div>

        <p class="text-gray-700 dark:text-gray-200 whitespace-pre-line">
          {{ post.content }}
        </p>

        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ formatDate(post.createdAt) }}
        </span>
      </div>
    </div>
  </div>
</template>
