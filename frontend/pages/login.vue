<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    </div>

    <div class="w-full max-w-md relative z-10" data-aos="zoom-in" data-aos-duration="800">
      <div class="relative group">
        <!-- Glow effect -->
        <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        
        <div class="relative backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20 overflow-hidden">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="flex justify-center mb-6">
              <div class="relative">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 hover:scale-110 transition-transform duration-300">
                  <Mic class="h-8 w-8 text-purple-400" />
                </div>
                <div class="absolute inset-0 bg-purple-400 rounded-2xl blur-xl opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
              </div>
            </div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p class="text-white/60">Sign in to your VoiceID account</p>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-2" data-aos="fade-up" data-aos-delay="100">
              <label for="email" class="block text-sm font-medium text-white/80">Email</label>
              <div class="relative group">
                <input 
                  id="email" 
                  v-model="email" 
                  type="email" 
                  required
                  class="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-white/40 hover:bg-white/10"
                  placeholder="your@email.com"
                />
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div class="space-y-2" data-aos="fade-up" data-aos-delay="200">
              <label for="password" class="block text-sm font-medium text-white/80">Password</label>
              <div class="relative group">
                <input 
                  id="password" 
                  v-model="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  required
                  class="w-full px-4 py-3 pr-12 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-white/40 hover:bg-white/10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors duration-200"
                >
                  <Eye v-if="!showPassword" class="h-5 w-5" />
                  <EyeOff v-else class="h-5 w-5" />
                </button>
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div class="flex items-center justify-between" data-aos="fade-up" data-aos-delay="300">
              <div class="flex items-center">
                <input 
                  id="remember" 
                  type="checkbox" 
                  v-model="remember"
                  class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/20 rounded bg-white/10 backdrop-blur-sm"
                />
                <label for="remember" class="ml-2 block text-sm text-white/70">Remember me</label>
              </div>

              <NuxtLink 
                to="/forgot-password"
                class="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:underline"
              >
                Forgot password?
              </NuxtLink>
            </div>

            <button 
              type="submit"
              :disabled="isLoading"
              class="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 font-medium flex items-center justify-center gap-2"
              data-aos="fade-up" 
              data-aos-delay="400"
            >
              <Loader2 v-if="isLoading" class="h-5 w-5 animate-spin" />
              <span>{{ isLoading ? 'Signing in...' : 'Sign In' }}</span>
            </button>
          </form>

          <!-- Divider -->
          <div class="my-6 flex items-center" data-aos="fade-up" data-aos-delay="500">
            <div class="flex-1 h-px bg-white/20"></div>
            <span class="px-4 text-sm text-white/60">or</span>
            <div class="flex-1 h-px bg-white/20"></div>
          </div>

          <!-- Social Login -->
          <div class="space-y-3" data-aos="fade-up" data-aos-delay="600">
            <button class="w-full py-3 px-4 backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white rounded-xl transition-all duration-300 hover:scale-105 font-medium flex items-center justify-center gap-3">
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <!-- Sign up link -->
          <div class="mt-8 text-center text-sm text-white/60" data-aos="fade-up" data-aos-delay="700">
            Don't have an account?
            <NuxtLink 
              to="/signup"
              class="text-purple-400 hover:text-purple-300 font-medium ml-1 transition-colors duration-200 hover:underline"
            >
              Sign up
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Mic, Eye, EyeOff, Loader2 } from 'lucide-vue-next'
import { useRouter } from 'nuxt/app'
import AOS from 'aos'
import 'aos/dist/aos.css'

const router = useRouter()
const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)

onMounted(() => {
  AOS.init({
    duration: 600,
    easing: 'ease-out-cubic',
    once: true
  })
})

const handleLogin = async () => {
  isLoading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  console.log('Login attempt with:', { 
    email: email.value, 
    password: password.value, 
    remember: remember.value 
  })

  // For demo purposes, redirect to the recording page
  router.push('/record')
  isLoading.value = false
}
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>