<template>
  <div class="min-h-screen">
    <header class="container mx-auto px-4 py-6 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <Mic class="h-8 w-8 text-purple-500" />
        <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">VoiceID</h1>
      </div>
      <div class="flex gap-4">
        <NuxtLink to="/login" class="px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors">Login</NuxtLink>
        <NuxtLink to="/signup" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors">Sign Up</NuxtLink>
      </div>
    </header>

    <main class="container mx-auto px-4 py-16">
      <div class="flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1 space-y-6">
          <h2 class="text-5xl font-bold leading-tight">
            Identify Speakers with
            <span class="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">AI Precision</span>
          </h2>
          <p class="text-xl text-zinc-400">
            Our advanced TDNN network with MFCC coefficients provides state-of-the-art speaker identification.
            Record, analyze, and identify speakers with just a few clicks.
          </p>
          <div class="flex gap-4 pt-4">
            <NuxtLink
              to="/signup"
              class="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-md transition-all transform hover:scale-105 font-medium"
            >
              Get Started
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="px-6 py-3 border border-zinc-700 hover:border-purple-500 rounded-md transition-all transform hover:scale-105 font-medium"
            >
              Learn More
            </NuxtLink>
          </div>
        </div>
        <div class="flex-1 relative">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75 animate-pulse"></div>
          <div class="relative bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <div class="flex flex-col items-center gap-4">
              <div class="w-full h-40 bg-zinc-800 rounded-md overflow-hidden">
                <div class="h-full flex items-center justify-center">
                  <div class="flex gap-1 items-end">
                    <div v-for="i in 20" :key="i" 
                      :class="`h-${Math.floor(Math.random() * 20) + 5} w-1 bg-purple-500 rounded-full animate-pulse`" 
                      :style="`animation-delay: ${i * 0.05}s; height: ${Math.floor(Math.random() * 30) + 10}px`">
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex gap-4 w-full">
                <button class="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors flex items-center justify-center gap-2">
                  <Mic class="h-4 w-4" />
                  <span>Record</span>
                </button>
                <button class="flex-1 px-4 py-2 border border-zinc-700 hover:border-purple-500 rounded-md transition-colors">
                  Identify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-purple-500 transition-all transform hover:scale-105">
          <div class="rounded-full bg-purple-900/30 w-12 h-12 flex items-center justify-center mb-4">
            <Mic class="h-6 w-6 text-purple-500" />
          </div>
          <h3 class="text-xl font-bold mb-2">Advanced Recording</h3>
          <p class="text-zinc-400">High-quality audio capture with noise reduction for optimal speaker identification.</p>
        </div>
        <div class="p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-purple-500 transition-all transform hover:scale-105">
          <div class="rounded-full bg-purple-900/30 w-12 h-12 flex items-center justify-center mb-4">
            <Waves class="h-6 w-6 text-purple-500" />
          </div>
          <h3 class="text-xl font-bold mb-2">MFCC Analysis</h3>
          <p class="text-zinc-400">Extract Mel-frequency cepstral coefficients for precise voice feature extraction.</p>
        </div>
        <div class="p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-purple-500 transition-all transform hover:scale-105">
          <div class="rounded-full bg-purple-900/30 w-12 h-12 flex items-center justify-center mb-4">
            <Brain class="h-6 w-6 text-purple-500" />
          </div>
          <h3 class="text-xl font-bold mb-2">TDNN Network</h3>
          <p class="text-zinc-400">Time Delay Neural Network trained on thousands of voice samples for accurate identification.</p>
        </div>
      </div>
    </main>

    <footer class="container mx-auto px-4 py-8 mt-16 border-t border-zinc-800 text-zinc-500">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center gap-2">
          <Mic class="h-5 w-5 text-purple-500" />
          <span class="font-bold">VoiceID</span>
        </div>
        <div class="mt-4 md:mt-0">© 2025 VoiceID. All rights reserved.</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Mic,Waves, Brain } from 'lucide-vue-next';
</script>