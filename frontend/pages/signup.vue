<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="relative">
        <div class="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75"></div>
        <div class="relative bg-zinc-900 p-8 rounded-lg border border-zinc-800">
          <div class="flex justify-center mb-6">
            <Mic class="h-10 w-10 text-purple-500" />
          </div>
          <h2 class="text-2xl font-bold text-center mb-6">Create your account</h2>
          
          <form @submit.prevent="handleSignup" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label for="firstName" class="block text-sm font-medium text-zinc-400">First name</label>
                <input 
                  id="firstName" 
                  v-model="firstName" 
                  type="text" 
                  required 
                  class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div class="space-y-2">
                <label for="lastName" class="block text-sm font-medium text-zinc-400">Last name</label>
                <input 
                  id="lastName" 
                  v-model="lastName" 
                  type="text" 
                  required 
                  class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-zinc-400">Email</label>
              <input 
                id="email" 
                v-model="email" 
                type="email" 
                required 
                class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-zinc-400">Password</label>
              <input 
                id="password" 
                v-model="password" 
                type="password" 
                required 
                class="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div class="flex items-center">
              <input 
                id="terms" 
                type="checkbox" 
                v-model="agreeToTerms" 
                required
                class="h-4 w-4 bg-zinc-800 border-zinc-700 rounded focus:ring-purple-500 text-purple-600"
              />
              <label for="terms" class="ml-2 block text-sm text-zinc-400">
                I agree to the <a href="#" class="text-purple-400 hover:text-purple-300">Terms of Service</a> and <a href="#" class="text-purple-400 hover:text-purple-300">Privacy Policy</a>
              </label>
            </div>
            
            <button 
              type="submit" 
              class="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors transform hover:scale-105 font-medium"
            >
              Sign up
            </button>
          </form>
          
          <div class="mt-6 text-center text-sm text-zinc-400">
            Already have an account?
            <NuxtLink to="/login" class="text-purple-400 hover:text-purple-300 font-medium">Log in</NuxtLink>
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
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const agreeToTerms = ref(false);

const handleSignup = () => {
  // Here you would implement actual signup logic
  console.log('Signup attempt with:', { 
    firstName: firstName.value, 
    lastName: lastName.value, 
    email: email.value, 
    password: password.value 
  });
  
  // For demo purposes, just redirect to the recording page
  router.push('/record');
};
</script>