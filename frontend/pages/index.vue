<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
    <header class=" mx-auto px-40 py-6 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <Mic class="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">VoiceID</h1>
      </div>
      <div class="flex gap-4">
        <NuxtLink 
          to="/login" 
          class="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-300"
        >
          Login
        </NuxtLink>
        <NuxtLink 
          to="/signup" 
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-300 hover:shadow-lg"
        >
          Sign Up
        </NuxtLink>
      </div>
    </header>

    <main class=" mx-auto px-40 py-16">
      <div class="flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1 space-y-6" data-aos="fade-right">
          <h2 class="text-5xl font-bold leading-tight text-gray-900 dark:text-white">
            Identify Speakers with <span class="text-indigo-600 dark:text-indigo-400">AI Precision</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            Our advanced TDNN network with MFCC coefficients provides state-of-the-art speaker identification.
            Record, analyze, and identify speakers with just a few clicks.
          </p>
          <div class="flex gap-4 pt-4">
            <NuxtLink
              to="/signup"
              class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-300 hover:shadow-lg font-medium"
            >
              Get Started
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="px-6 py-3 border border-gray-300 hover:border-indigo-500 text-gray-700 dark:text-gray-300 dark:border-gray-700 rounded-md transition-all duration-300 font-medium"
            >
              Learn More
            </NuxtLink>
          </div>
        </div>
        <div class="flex-1" data-aos="fade-left">
          <div class="relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 opacity-60"></div>
            <div class="relative flex flex-col items-center gap-4">
              <div class="w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <div class="h-full flex items-center justify-center">
                  <div class="flex gap-1 items-end">
                    <div 
                      v-for="i in 20" 
                      :key="i" 
                      class="w-1 bg-indigo-500 rounded-full animate-wave" 
                      :style="`animation-delay: ${i * 0.05}s; height: ${Math.floor(Math.random() * 30) + 10}px`"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="flex gap-4 w-full">
                <button class="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-300 flex items-center justify-center gap-2">
                  <Mic class="h-4 w-4" />
                  <span>Record</span>
                </button>
                <button class="flex-1 px-4 py-2 border border-gray-300 hover:border-indigo-500 text-gray-700 dark:text-gray-300 dark:border-gray-700 rounded-md transition-all duration-300">
                  Identify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          class="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="rounded-full bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center mb-4">
            <Mic class="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Advanced Recording</h3>
          <p class="text-gray-600 dark:text-gray-400">High-quality audio capture with noise reduction for optimal speaker identification.</p>
        </div>
        <div 
          class="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="rounded-full bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center mb-4">
            <Waves class="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">MFCC Analysis</h3>
          <p class="text-gray-600 dark:text-gray-400">Extract Mel-frequency cepstral coefficients for precise voice feature extraction.</p>
        </div>
        <div 
          class="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div class="rounded-full bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center mb-4">
            <Brain class="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">TDNN Network</h3>
          <p class="text-gray-600 dark:text-gray-400">Time Delay Neural Network trained on thousands of voice samples for accurate identification.</p>
        </div>
      </div>
    </main>

    <footer class=" mx-auto px-40 py-8 mt-16 border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center gap-2">
          <Mic class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <span class="font-bold text-gray-900 dark:text-white">VoiceID</span>
        </div>
        <div class="mt-4 md:mt-0">© 2025 VoiceID. All rights reserved.</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Mic, Waves, Brain } from 'lucide-vue-next';
import AOS from 'aos';
import 'aos/dist/aos.css';

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
});
</script>

<style>
@keyframes wave {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
}

.animate-wave {
  animation: wave 1.5s infinite ease-in-out;
}

.dark {
  color-scheme: dark;
}
</style>