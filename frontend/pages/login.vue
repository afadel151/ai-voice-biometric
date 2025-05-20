<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
    <div class="w-full max-w-md" >
      <div
        class="relative bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
        <div
          class="absolute inset-0  dark:from-indigo-900/20 dark:to-purple-900/20 opacity-60">
        </div>
        <div class="relative">
          <div class="flex justify-center mb-6">
            <Mic class="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 class="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Log in to VoiceID</h2>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input id="email" v-model="email" type="email" required
                class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="your@email.com" />
            </div>

            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input id="password" v-model="password" type="password" required
                class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="••••••••" />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember" type="checkbox" v-model="remember"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700" />
                <label for="remember" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
              </div>

              <NuxtLink to="/forgot-password"
                class="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200">
                Forgot password?
              </NuxtLink>
            </div>

            <button type="submit"
              class="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-300 hover:shadow-md font-medium mt-4">
              Log in
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <NuxtLink to="/signup"
              class="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium ml-1 transition-colors duration-200">
              Sign up
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Mic } from 'lucide-vue-next';
import { useRouter } from 'nuxt/app';

const router = useRouter();
const email = ref('');
const password = ref('');
const remember = ref(false);

const handleLogin = () => {
  // Here you would implement actual authentication logic
  console.log('Login attempt with:', { email: email.value, password: password.value, remember: remember.value });

  // For demo purposes, just redirect to the recording page
  router.push('/record');
};
</script>

<style scoped>
/* You can add any custom styles here if needed */
</style>