<template>
  <div
    class="min-h-screen py-8 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    <!-- Enhanced animated background -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob">
      </div>
      <div
        class="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000">
      </div>
      <div
        class="absolute top-40 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000">
      </div>
      <div
        class="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-6000">
      </div>
    </div>

    <!-- Floating sound waves -->
    <div class="absolute inset-0 pointer-events-none">
      <div v-for="i in 15" :key="i" class="absolute opacity-10" :style="`
             left: ${Math.random() * 100}%; 
             top: ${Math.random() * 100}%; 
             animation-delay: ${Math.random() * 8}s;
           `">
        <div class="w-8 h-8 border-2 border-white rounded-full animate-ping"></div>
      </div>
    </div>

    <div class="container mx-auto max-w-6xl relative z-10">
      <!-- Enhanced Header -->
      <div class="flex justify-between items-center mb-16" data-aos="fade-down">
        <div class="inline-flex items-center gap-4 mb-6">
          <div class="relative">
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Mic class="h-8 w-8 text-purple-400" />
            </div>
            <div class="absolute inset-0 bg-purple-400 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          </div>
          <div class="text-left">
            <h1 class="text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Speaker Identification
              </span>
            </h1>
            <p class="text-white/60 text-lg mt-2">Advanced AI-powered voice recognition</p>
          </div>
        </div>

        <!-- Status indicator -->
        <div
          class="inline-flex items-center gap-2 backdrop-blur-sm bg-white/10 px-6 py-3 rounded-full border border-white/20">
          <div class="w-3 h-3 rounded-full" :class="statusIndicatorClass"></div>
          <span class="text-white/80 font-medium">{{ statusText }}</span>
        </div>
      </div>

      <!-- Main Recording Interface -->
      <div class="grid lg:grid-cols-3 gap-8 mb-12">
        <!-- Audio Visualization Panel -->
        <div class="lg:col-span-2" data-aos="fade-right" data-aos-delay="200">
          <div class="relative group">
            <div
              class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000">
            </div>

            <div class="relative backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-white flex items-center gap-2">
                  <Waves class="h-5 w-5 text-purple-400" />
                  Audio Visualization
                </h3>
                <div class="flex items-center gap-2">
                  <button @click="toggleVisualizationMode"
                    class="p-2 backdrop-blur-sm bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-300">
                    <BarChart3 v-if="visualizationMode === 'wavesform'" class="h-4 w-4 text-white/80" />
                    <Waves v-else class="h-4 w-4 text-white/80" />
                  </button>
                </div>
              </div>

              <!-- Enhanced Audio Visualization -->
              <div
                class="h-96 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl flex items-center justify-center overflow-hidden relative border border-white/10">
                <!-- Default state -->
                <div v-if="!audioBlob && !isRecording" class="text-center">
                  <div class="relative mb-8">
                    <div
                      class="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto">
                      <Mic class="h-16 w-16 text-purple-400" />
                    </div>
                    <div class="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-20 animate-ping"></div>
                    <div
                      class="absolute inset-4 bg-pink-400 rounded-full blur-xl opacity-15 animate-ping animation-delay-1000">
                    </div>
                  </div>
                  <p class="text-white/60 text-xl mb-4">Ready to Record</p>
                  <p class="text-white/40">Click "Start Recording" to begin voice capture</p>
                </div>

                <!-- Live recording visualization -->
                <div v-else-if="isRecording" class="w-full h-full flex items-center justify-center p-8">
                  <div class="flex items-end gap-1 w-full h-full max-w-5xl">
                    <div v-for="(level, i) in liveAudioLevels" :key="i"
                      class="bg-gradient-to-t from-purple-500  to-cyan-300 rounded-full transition-all duration-100 ease-out shadow-lg"
                      :class="visualizationMode === 'bars' ? 'w-3' : 'w-1'" :style="`
                        height: ${level}%; 
                        box-shadow: 0 0 ${level / 5}px rgba(168, 85, 247, 0.6);
                        animation-delay: ${i * 20}ms;
                      `"></div>
                  </div>

                  <!-- Enhanced recording indicator -->
                  <div
                    class="absolute top-6 right-6 flex items-center gap-3 backdrop-blur-sm bg-red-500/20 px-6 py-3 rounded-2xl border border-red-500/30">
                    <div class="relative">
                      <div class="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                      <div class="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <div class="text-white">
                      <div class="text-sm font-medium">Recording</div>
                      <div class="text-xs opacity-80">{{ formatTime(recordingTime) }}</div>
                    </div>
                  </div>

                  <!-- Audio level meter -->
                  <div class="absolute bottom-6 left-6 right-6">
                    <div class="backdrop-blur-sm bg-white/10 p-4 rounded-xl border border-white/20">
                      <div class="flex items-center gap-3">
                        <Volume2 class="h-5 w-5 text-white/80" />
                        <div class="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                          <div
                            class="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-100"
                            :style="`width: ${audioLevel}%`"></div>
                        </div>
                        <span class="text-white/80 text-sm font-mono">{{ Math.round(audioLevel) }}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Enhanced playback visualization -->
                <div v-else class="w-full h-full relative">
                  <canvas ref="visualizer" class="w-full h-full rounded-xl cursor-pointer" style="min-height: 384px;"
                    @click="handleCanvasClick"></canvas>

                  <!-- Playback overlay -->
                  <div v-if="audioBlob" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div v-if="!isPlaying"
                      class="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 pointer-events-auto cursor-pointer"
                      @click="playAudio">
                      <Play class="h-10 w-10 text-white ml-1" />
                    </div>
                  </div>

                  <!-- Waveform progress indicator -->
                  <div v-if="audioBlob && isPlaying" class="absolute top-4 left-4 right-4">
                    <div class="backdrop-blur-sm bg-white/10 p-3 rounded-xl border border-white/20">
                      <div class="flex items-center gap-3">
                        <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div class="text-white/80 text-sm">Playing audio visualization</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Control Panel -->
        <div class="space-y-6" data-aos="fade-left" data-aos-delay="400">
          <!-- Recording Controls -->
          <div class="relative group">
            <div
              class="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500">
            </div>
            <div class="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
              <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Settings class="h-5 w-5 text-purple-400" />
                Controls
              </h3>

              <div class="space-y-4">
                <button v-if="!isRecording && !audioBlob" @click="startRecording"
                  class="w-full group px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 flex items-center justify-center gap-3 font-medium">
                  <Mic class="h-5 w-5 group-hover:animate-pulse" />
                  Start Recording
                </button>

                <button v-if="isRecording" @click="stopRecording"
                  class="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/30 flex items-center justify-center gap-3 font-medium">
                  <Square class="h-5 w-5" />
                  Stop Recording
                </button>

                <div v-if="audioBlob" class="space-y-3">
                  <button @click="playAudio"
                    class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 font-medium"
                    :disabled="isPlaying">
                    <Play v-if="!isPlaying" class="h-5 w-5" />
                    <Pause v-else class="h-5 w-5" />
                    {{ isPlaying ? 'Playing' : 'Play Audio' }}
                  </button>

                  <button @click="identifySpeaker" :disabled="isIdentifying"
                    class="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center gap-3 font-medium">
                    <Loader2 v-if="isIdentifying" class="h-5 w-5 animate-spin" />
                    <User v-else class="h-5 w-5" />
                    {{ isIdentifying ? 'Analyzing...' : 'Identify Speaker' }}
                  </button>

                  <button @click="resetRecording"
                    class="w-full px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 font-medium">
                    <RefreshCw class="h-5 w-5" />
                    New Recording
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Audio Info Panel -->
          <div v-if="audioBlob" class="relative group">
            <div
              class="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500">
            </div>
            <div class="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
              <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Info class="h-5 w-5 text-blue-400" />
                Audio Info
              </h3>

              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-center">
                  <span class="text-white/60">Duration:</span>
                  <span class="text-white font-mono">{{ formatTime(duration) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-white/60">Size:</span>
                  <span class="text-white font-mono">{{ formatFileSize(audioBlob.size) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-white/60">Format:</span>
                  <span class="text-white font-mono">WAV</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-white/60">Quality:</span>
                  <span class="text-emerald-400 font-medium">High</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="relative group">
            <div
              class="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500">
            </div>
            <div class="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
              <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap class="h-5 w-5 text-orange-400" />
                Quick Actions
              </h3>

              <div class="grid grid-cols-2 gap-3">
                <button @click="downloadAudio" :disabled="!audioBlob"
                  class="p-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white border border-white/20 hover:border-white/30 disabled:border-white/10 rounded-xl transition-all duration-300 hover:scale-105 flex flex-col items-center gap-2 text-sm disabled:opacity-50">
                  <Download class="h-5 w-5" />
                  Download
                </button>
                <button @click="shareAudio" :disabled="!audioBlob"
                  class="p-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white border border-white/20 hover:border-white/30 disabled:border-white/10 rounded-xl transition-all duration-300 hover:scale-105 flex flex-col items-center gap-2 text-sm disabled:opacity-50">
                  <Share2 class="h-5 w-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Audio Controls -->
      

      <!-- Enhanced Results Section -->
      <div v-if="identificationResult" class="relative group" data-aos="fade-up" data-aos-delay="800">
        <div
          class="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000">
        </div>

        <div class="relative backdrop-blur-xl bg-white/10 p-8 lg:p-12 rounded-3xl border border-white/20">
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                <User class="h-8 w-8 text-emerald-400" />
              </div>
              <div>
                <h3 class="text-3xl font-bold text-white">Identification Results</h3>
                <p class="text-white/60">AI analysis completed</p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm text-white/60">Confidence Score</div>
              <div class="text-2xl font-bold text-emerald-400">{{ identificationResult.confidence }}%</div>
            </div>
          </div>

          <!-- Primary Result -->
          <div class="mb-8">
            <div class="relative group/card">
              <div
                class="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-30 group-hover/card:opacity-50 transition duration-500">
              </div>
              <div
                class="relative backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-6">
                    <div
                      class="w-20 h-20 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <User class="h-10 w-10 text-emerald-400" />
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-white mb-2">{{ identificationResult.name }}</div>
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span class="text-emerald-400 font-medium">Primary Match</span>
                      </div>
                      <div class="text-white/60 text-sm mt-1">Voice pattern recognized with high confidence</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-4xl font-bold text-emerald-400 mb-1">{{ identificationResult.confidence }}%</div>
                    <div class="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                        :style="`width: ${identificationResult.confidence}%`"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Alternative Matches -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-white/80 mb-4">Alternative Matches</h4>
            <div v-for="(speaker, index) in identificationResult.otherSpeakers" :key="index"
              class="relative group/card">
              <div
                class="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur opacity-0 group-hover/card:opacity-30 transition duration-500">
              </div>
              <div
                class="relative backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <User class="h-8 w-8 text-white/60" />
                    </div>
                    <div>
                      <div class="text-xl font-bold text-white mb-1">{{ speaker.name }}</div>
                      <div class="text-white/60 font-medium">Possible Match</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl font-bold text-white/80 mb-1">{{ speaker.confidence }}%</div>
                    <div class="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-gradient-to-r from-white/60 to-white/40 rounded-full transition-all duration-1000"
                        :style="`width: ${speaker.confidence}%`"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-4 mt-8 pt-8 border-t border-white/20">
            <button
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <Download class="h-5 w-5" />
              Export Results
            </button>
            <button
              class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <Share2 class="h-5 w-5" />
              Share Analysis
            </button>
            <button
              class="px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <RotateCcw class="h-5 w-5" />
              Analyze Again
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import {
  Mic, Play, Pause, Square, User, RefreshCw, Loader2, Settings, Info, Zap,
  Download, Share2, Volume2, VolumeX, Waves, BarChart3, RotateCcw
} from 'lucide-vue-next'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Audio recording state
const isRecording = ref(false)
const mediaRecorder = ref(null)
const audioChunks = ref([])
const audioBlob = ref(null)
const audioURL = ref('')
const audioElement = ref(null)
const visualizer = ref(null)
const audioContext = ref(null)
const analyser = ref(null)
const liveAudioLevels = ref(Array(80).fill(5))
const isIdentifying = ref(false)
const recordingTime = ref(0)
const audioLevel = ref(0)
const visualizationMode = ref('bars') // 'bars' or 'waveform'

// Playback state
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(80)
const isMuted = ref(false)

// Computed properties
const playbackProgress = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

const statusIndicatorClass = computed(() => {
  if (isRecording.value) return 'bg-red-500 animate-pulse'
  if (isPlaying.value) return 'bg-green-500 animate-pulse'
  if (audioBlob.value) return 'bg-blue-500'
  return 'bg-gray-500'
})

const statusText = computed(() => {
  if (isRecording.value) return 'Recording in progress'
  if (isPlaying.value) return 'Playing audio'
  if (audioBlob.value) return 'Audio ready'
  return 'Ready to record'
})

// Identification results
const identificationResult = ref(null)

// Recording timer
let recordingInterval = null

// Start recording audio
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    })

    mediaRecorder.value = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus'
    })
    audioChunks.value = []

    // Setup audio context for live visualization
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)()
    const source = audioContext.value.createMediaStreamSource(stream)
    analyser.value = audioContext.value.createAnalyser()
    analyser.value.fftSize = 256
    analyser.value.smoothingTimeConstant = 0.8
    source.connect(analyser.value)

    mediaRecorder.value.ondataavailable = (event) => {
      audioChunks.value.push(event.data)
    }

    mediaRecorder.value.onstop = () => {
      const blob = new Blob(audioChunks.value, { type: 'audio/wav' })
      audioBlob.value = blob
      audioURL.value = URL.createObjectURL(blob)

      // Create audio element for playback
      audioElement.value = new Audio(audioURL.value)
      audioElement.value.volume = volume.value / 100
      audioElement.value.addEventListener('timeupdate', updatePlaybackProgress)
      audioElement.value.addEventListener('loadedmetadata', () => {
        duration.value = audioElement.value.duration
        setupAudioVisualization()
      })
      audioElement.value.addEventListener('ended', () => {
        isPlaying.value = false
      })
    }

    mediaRecorder.value.start()
    isRecording.value = true
    recordingTime.value = 0

    // Start recording timer
    recordingInterval = setInterval(() => {
      recordingTime.value += 1
    }, 1000)

    updateLiveVisualization()
  } catch (error) {
    console.error('Error starting recording:', error)
  }
}

// Update live visualization during recording
const updateLiveVisualization = () => {
  if (!isRecording.value || !analyser.value) return

  const dataArray = new Uint8Array(analyser.value.frequencyBinCount)
  analyser.value.getByteFrequencyData(dataArray)

  // Calculate average audio level
  const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length
  audioLevel.value = (average / 255) * 100

  // Generate visualization levels
  const levels = []
  const barCount = visualizationMode.value === 'bars' ? 80 : 120

  for (let i = 0; i < barCount; i++) {
    const index = Math.floor(i / barCount * dataArray.length)
    const value = dataArray[index] || 0
    const normalizedValue = Math.max(5, Math.min(95, (value / 255) * 100))
    levels.push(normalizedValue)
  }

  liveAudioLevels.value = levels

  requestAnimationFrame(updateLiveVisualization)
}

// Stop recording audio
const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop()
    isRecording.value = false

    // Clear recording timer
    if (recordingInterval) {
      clearInterval(recordingInterval)
      recordingInterval = null
    }

    // Stop all tracks on the stream
    mediaRecorder.value.stream.getTracks().forEach(track => track.stop())

    // Close audio context
    if (audioContext.value) {
      audioContext.value.close()
      audioContext.value = null
      analyser.value = null
    }
  }
}

// Reset recording state
const resetRecording = () => {
  if (audioElement.value) {
    audioElement.value.pause()
    audioElement.value.removeEventListener('timeupdate', updatePlaybackProgress)
  }

  audioBlob.value = null
  audioURL.value = ''
  audioElement.value = null
  isPlaying.value = false
  currentTime.value = 0
  duration.value = 0
  identificationResult.value = null
  recordingTime.value = 0

  // Clear canvas
  if (visualizer.value) {
    const ctx = visualizer.value.getContext('2d')
    ctx.clearRect(0, 0, visualizer.value.width, visualizer.value.height)
  }
}

// Play/pause audio
const playAudio = () => {
  if (!audioElement.value) return

  if (isPlaying.value) {
    audioElement.value.pause()
  } else {
    audioElement.value.play().catch((error) => {
      console.error('Error playing audio:', error)
    })
  }

  isPlaying.value = !isPlaying.value
}

// Update playback progress
const updatePlaybackProgress = () => {
  if (!audioElement.value) return
  currentTime.value = audioElement.value.currentTime
}

// Seek audio
const seekAudio = (event) => {
  if (!audioElement.value || !duration.value) return

  const rect = event.target.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = clickX / rect.width
  const newTime = percentage * duration.value

  audioElement.value.currentTime = newTime
  currentTime.value = newTime
}

// Handle canvas click for seeking
const handleCanvasClick = (event) => {
  if (!audioElement.value || !duration.value) return

  const rect = event.target.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = clickX / rect.width
  const newTime = percentage * duration.value

  audioElement.value.currentTime = newTime
  currentTime.value = newTime
}

// Toggle mute
const toggleMute = () => {
  if (!audioElement.value) return

  isMuted.value = !isMuted.value
  audioElement.value.muted = isMuted.value
}

// Toggle visualization mode
const toggleVisualizationMode = () => {
  visualizationMode.value = visualizationMode.value === 'bars' ? 'waveform' : 'bars'
}

// Watch volume changes
watch(volume, (newVolume) => {
  if (audioElement.value) {
    audioElement.value.volume = newVolume / 100
  }
})

// Format time in MM:SS format
const formatTime = (seconds) => {
  if (isNaN(seconds)) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Download audio
const downloadAudio = () => {
  if (!audioBlob.value) return

  const url = URL.createObjectURL(audioBlob.value)
  const a = document.createElement('a')
  a.href = url
  a.download = `recording-${new Date().toISOString().slice(0, 19)}.wav`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Share audio
const shareAudio = async () => {
  if (!audioBlob.value) return

  if (navigator.share) {
    try {
      const file = new File([audioBlob.value], 'recording.wav', { type: 'audio/wav' })
      await navigator.share({
        title: 'Voice Recording',
        text: 'Check out this voice recording',
        files: [file]
      })
    } catch (error) {
      console.error('Error sharing:', error)
    }
  } else {
    // Fallback: copy link to clipboard
    const url = URL.createObjectURL(audioBlob.value)
    await navigator.clipboard.writeText(url)
    alert('Audio link copied to clipboard!')
  }
}

// Setup enhanced audio visualization
const setupAudioVisualization = () => {
  if (!visualizer.value || !audioBlob.value || !audioElement.value) return

  const canvas = visualizer.value
  const ctx = canvas.getContext('2d')

  canvas.width = canvas.offsetWidth || canvas.clientWidth
  canvas.height = canvas.offsetHeight || canvas.clientHeight

  if (canvas.width === 0 || canvas.height === 0) return

  audioContext.value = new (window.AudioContext || window.webkitAudioContext)()
  if (audioContext.value.state === 'suspended') {
    audioContext.value.resume()
  }

  analyser.value = audioContext.value.createAnalyser()
  analyser.value.fftSize = 512
  analyser.value.smoothingTimeConstant = 0.8
  const bufferLength = analyser.value.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)

  try {
    const source = audioContext.value.createMediaElementSource(audioElement.value)
    source.connect(analyser.value)
    analyser.value.connect(audioContext.value.destination)
  } catch (error) {
    console.error('Error connecting audio source:', error)
    return
  }

  const drawVisualization = () => {
    if (!isPlaying.value || !analyser.value) return

    analyser.value.getByteFrequencyData(dataArray)

    // Create gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    bgGradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)')
    bgGradient.addColorStop(1, 'rgba(30, 30, 60, 0.2)')


    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const barWidth = (canvas.width / bufferLength) * 2.5
    let x = 0
   
    for (let i = 0; i < bufferLength; i++) {
      
      const barHeight = (dataArray[i] / 255) * canvas.height * 0.9

      // Create dynamic bar gradient
      const barGradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight)
      const intensity = dataArray[i] / 255

      if (intensity > 0.8) {
        barGradient.addColorStop(0, '#8b5cf6') // purple
        barGradient.addColorStop(1, '#a855f7') // violet
      } else if (intensity > 0.5) {
        barGradient.addColorStop(0, '#6366f1') // indigo
        barGradient.addColorStop(1, '#8b5cf6') // purple
      } else {
        barGradient.addColorStop(0, '#4f46e5') // deep indigo
        barGradient.addColorStop(1, '#6366f1') // indigo
      }


      ctx.fillStyle = barGradient
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

      // Add glow effect for high frequencies
      if (intensity > 0.7) {
        ctx.shadowColor = 'rgba(139, 92, 246, 0.3)' // soft purple glow
        ctx.shadowBlur = 8
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        ctx.shadowBlur = 0
      }


      x += barWidth + 1
    }
    
    // Draw progress line
    const progressX = (currentTime.value / duration.value) * canvas.width
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(progressX, 0)
    ctx.lineTo(progressX, canvas.height)
    ctx.stroke()

    requestAnimationFrame(drawVisualization)
  }

  audioElement.value.addEventListener('play', () => {
    isPlaying.value = true
    drawVisualization()
  })

  audioElement.value.addEventListener('pause', () => {
    isPlaying.value = false
  })

  audioElement.value.addEventListener('ended', () => {
    isPlaying.value = false
  })
}

// Enhanced speaker identification
const identifySpeaker = async () => {
  isIdentifying.value = true

  if (!audioBlob.value) {
    console.error("No audio to send");
    return;
  }

  const formData = new FormData()
  formData.append('file', audioBlob.value, 'recording.wav')

  // try {
  //   const response = await fetch('http://127.0.0.1:8000/identify/', {
  //     method: 'POST',
  //     body: formData,
  //   })

  //   if (!response.ok) throw new Error('Upload failed')
  //   const result = await response.json()
  //   console.log('Backend response:', result)
  // } catch (err) {
  //   console.error('Failed to send audio:', err)
  // }

  identificationResult.value = {
    name: 'Akram Fadel',
    confidence: 92,
    otherSpeakers: [
      { name: 'Sarah Johnson', confidence: 22 },
      { name: 'Michael Chen', confidence: 15 },
      { name: 'Emma Wilson', confidence: 6 },
      { name: 'David Brown', confidence: 5 }
    ]
  }

  isIdentifying.value = false
}

// Cleanup on component unmount
onBeforeUnmount(() => {
  if (mediaRecorder.value && mediaRecorder.value.state === 'recording') {
    mediaRecorder.value.stop()
    mediaRecorder.value.stream.getTracks().forEach(track => track.stop())
  }

  if (recordingInterval) {
    clearInterval(recordingInterval)
  }

  if (audioElement.value) {
    audioElement.value.pause()
    audioElement.value.removeEventListener('timeupdate', updatePlaybackProgress)
  }

  if (audioContext.value) {
    audioContext.value.close()
  }
})

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

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

.animation-delay-1000 {
  animation-delay: 1s;
}
</style>
