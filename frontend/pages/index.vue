<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Floating particles -->
    <div class="absolute inset-0">
      <div v-for="i in 20" :key="i" 
           class="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
           :style="`
             left: ${Math.random() * 100}%; 
             top: ${Math.random() * 100}%; 
             animation-delay: ${Math.random() * 5}s;
             animation-duration: ${3 + Math.random() * 4}s;
           `">
      </div>
    </div>

    <header class="relative z-10 container mx-auto px-6 lg:px-12 py-6">
      <nav class="flex justify-between items-center backdrop-blur-sm bg-white/5 rounded-2xl px-6 py-4 border border-white/10">
        <div class="flex items-center gap-3 group cursor-pointer">
          <div class="relative">
            <Mic class="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-all duration-300 group-hover:scale-110" />
            <div class="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            VoiceID
          </h1>
        </div>
        <div class="flex gap-3">
          <NuxtLink 
            to="/login" 
            class="px-6 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
          >
            Login
          </NuxtLink>
          <NuxtLink 
            to="/signup" 
            class="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 font-medium"
          >
            Sign Up
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="relative z-10 container mx-auto px-6 lg:px-12 py-16">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        <!-- Hero Content -->
        <div class="flex-1 space-y-8" data-aos="fade-right" data-aos-duration="1000">
          <div class="space-y-6">
            <h2 class="text-6xl lg:text-7xl font-bold leading-tight">
              <span class="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Identify Speakers
              </span>
              <br>
              <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                with AI Precision
              </span>
            </h2>
            <p class="text-xl text-white/70 leading-relaxed max-w-2xl">
              Our advanced CNN network with MFCC coefficients provides state-of-the-art speaker identification.
              Record, analyze, and identify speakers with just a few clicks.
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <NuxtLink
              to="/signup"
              class="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 font-medium text-lg flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight class="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="px-8 py-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 hover:scale-105 font-medium text-lg"
            >
              Learn More
            </NuxtLink>
          </div>
        </div>

        <!-- Interactive Demo -->
        <div class="flex-1 w-full max-w-lg" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
          <div class="relative group">
            <!-- Glow effect -->
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div class="relative backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20 overflow-hidden">
              <!-- Audio Visualization -->
              <div class="h-48 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative">
                <div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
                <div class="relative flex gap-1 items-end h-full w-full justify-center py-8">
                  <div 
                    v-for="i in 32" 
                    :key="i" 
                    class="w-2 bg-gradient-to-t from-purple-500 to-pink-400 rounded-full animate-wave opacity-80" 
                    :style="`
                      animation-delay: ${i * 0.05}s; 
                      height: ${Math.floor(Math.random() * 60) + 20}px;
                      animation-duration: ${1 + Math.random()}s;
                    `"
                  ></div>
                </div>
                
                <!-- Pulse effect -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-20 h-20 bg-white/10 rounded-full animate-ping"></div>
                  <div class="absolute w-12 h-12 bg-white/20 rounded-full animate-pulse"></div>
                </div>
              </div>

              <!-- Controls -->
              <div class="flex gap-3 w-full">
                <button 
                  @click="toggleDemo"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 font-medium"
                >
                  <Mic class="h-5 w-5" />
                  <span>{{ isRecording ? 'Recording...' : 'Record' }}</span>
                </button>
                <button 
                  class="flex-1 px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl transition-all duration-300 hover:scale-105 font-medium"
                >
                  Identify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features"
          :key="index"
          class="group relative"
          data-aos="fade-up"
          :data-aos-delay="100 * (index + 1)"
          data-aos-duration="800"
        >
          <!-- Glow effect -->
          <div class="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
          
          <div class="relative backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
            <div class="relative mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                <component :is="feature.icon" class="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
              </div>
              <div class="absolute inset-0 bg-purple-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-white group-hover:text-purple-200 transition-colors duration-300">
              {{ feature.title }}
            </h3>
            <p class="text-white/70 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 container mx-auto px-6 lg:px-12 py-12 mt-24">
      <div class="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center gap-3 mb-4 md:mb-0">
            <Mic class="h-6 w-6 text-purple-400" />
            <span class="font-bold text-xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">VoiceID</span>
          </div>
          <div class="text-white/60">© 2025 VoiceID. All rights reserved.</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Mic, Waves, Brain, ArrowRight } from 'lucide-vue-next'
import AOS from 'aos'
import 'aos/dist/aos.css'

const isRecording = ref(false)

const features = [
  {
    icon: Mic,
    title: 'Advanced Recording',
    description: 'High-quality audio capture with noise reduction for optimal speaker identification.'
  },
  {
    icon: Waves,
    title: 'MFCC Analysis',
    description: 'Extract Mel-frequency cepstral coefficients for precise voice feature extraction.'
  },
  {
    icon: Brain,
    title: 'CNN Network',
    description: 'Convolutional Neural Network trained on thousands of voice samples for accurate identification.'
  }
]

const toggleDemo = () => {
  isRecording.value = !isRecording.value
  setTimeout(() => {
    isRecording.value = false
  }, 3000)
}

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
  })
})
</script>

<style scoped>
@keyframes wave {
  0%, 100% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1.5);
  }
}

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

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-wave {
  animation: wave 1.5s infinite ease-in-out;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>