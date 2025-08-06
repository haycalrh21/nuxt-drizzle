<script setup lang="ts">
import { useAuthClient } from "~/composables/useAuth";
import { useRouter } from "vue-router";
import { ref } from "vue";

const toast = useToast();
const router = useRouter();
const authClient = useAuthClient();

const password = ref("");
const name = ref("");
const currentPassword = ref("");
const isLoading = ref(false);
const isLoadingName = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);

const session = authClient.useSession();

async function changeName() {
  if (!session.value.data?.user) {
    router.push("/auth/login");
    return;
  }

  try {
    isLoadingName.value = true;
    error.value = null;
    success.value = null;

    const response = await authClient.updateUser({
      name: name.value,
    });

    if (response.error) {
      toast.add({
        title: "Error updating name",
        description: "There was a problem with your request.",
        icon: "heroicons:exclamation-circle",
      });
    } else {
      toast.add({
        title: "Name updated successfully",
        description: "Your name has been successfully updated.",
        icon: "heroicons:check-circle",
      });
      window.dispatchEvent(
        new CustomEvent("nameUpdated", {
          detail: name.value,
        })
      );
      await authClient.getSession();
      name.value = "";
    }
  } catch (err) {
    console.error("Error changing name:", err);
    error.value = "Terjadi kesalahan saat mengubah nama";
  } finally {
    isLoadingName.value = false;
  }
}

async function changePassword() {
  if (!session.value.data?.user) {
    router.push("/auth/login");
    return;
  }

  try {
    isLoading.value = true;
    error.value = null;
    success.value = null;

    const response = await authClient.changePassword({
      newPassword: password.value,
      currentPassword: currentPassword.value,
      revokeOtherSessions: true,
    });

    if (response.error) {
      toast.add({
        title: "Your password is wrong",
        description: "There was a problem with your request.",
        icon: "heroicons:exclamation-circle",
      });
    } else {
      toast.add({
        title: "Your password has been changed",
        description: "Your password has been successfully changed.",
        icon: "heroicons:check-circle",
      });
      password.value = "";
      currentPassword.value = "";
    }
  } catch (err) {
    console.error("Error changing password:", err);
    error.value = "Terjadi kesalahan saat mengubah password";
  } finally {
    isLoading.value = false;
  }
}

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
  title: "Profile",
  layout: "dashboard-sidebar",
  middleware: "auth",
  meta: [
    {
      name: "description",
      content: "Halaman dashboard pengguna yang telah masuk.",
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
        <form class="mt-8 space-y-6" @submit.prevent="changePassword">
          <!-- CURRENT PASSWORD -->
          <div class="relative">
            <input
              :type="showCurrentPassword ? 'text' : 'password'"
              v-model="currentPassword"
              id="currentPassword"
              name="currentPassword"
              autocomplete="current-password"
              required
              :disabled="isLoading"
              placeholder="Current Password"
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white disabled:opacity-50"
            />
            <button
              type="button"
              class="absolute right-2 top-2 text-white text-sm"
              @click="showCurrentPassword = !showCurrentPassword"
            >
              <Icon :name="showCurrentPassword ? 'mdi:eye-off' : 'mdi:eye'" />
            </button>
          </div>

          <!-- NEW PASSWORD -->
          <div class="relative">
            <input
              :type="showNewPassword ? 'text' : 'password'"
              v-model="password"
              id="password"
              name="password"
              autocomplete="new-password"
              required
              :disabled="isLoading"
              placeholder="New Password"
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white disabled:opacity-50"
            />
            <button
              type="button"
              class="absolute right-2 top-2 text-white text-sm"
              @click="showNewPassword = !showNewPassword"
            >
              <Icon :name="showNewPassword ? 'mdi:eye-off' : 'mdi:eye'" />
            </button>
          </div>

          <div v-if="error" class="text-red-600 text-sm text-center">
            {{ error }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            >
              <span v-if="isLoading" class="flex items-center gap-2">
                <Icon name="mdi:loading" class="animate-spin h-5 w-5" />
                Loading...
              </span>
              <span v-else>Change Password</span>
            </button>
          </div>
        </form>
      </div>
      <div
        class="bg-gray-800 rounded-lg text-white shadow-sm border border-gray-700 p-4 sm:p-6"
      >
        <form class="mt-8 space-y-6" @submit.prevent="changeName">
          <div class="relative">
            <input
              type="text"
              v-model="name"
              id="changeName"
              name="changeName"
              autocomplete="name"
              required
              :disabled="isLoadingName"
              placeholder="Change Name"
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white disabled:opacity-50"
            />
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoadingName"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            >
              <span v-if="isLoadingName" class="flex items-center gap-2">
                <Icon name="mdi:loading" class="animate-spin h-5 w-5" />
                Loading...
              </span>
              <span v-else>Change Name</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
