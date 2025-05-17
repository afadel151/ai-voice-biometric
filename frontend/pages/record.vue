<template>
  <div class="min-h-screen py-12 px-4">
    <div class="container mx-auto max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center">
        <span class="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Speaker Identification</span>
      </h1>
      
      <div class="relative">
        <div class="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75"
             :class="{ 'animate-pulse': isRecording }"></div>
        <div class="relative bg-zinc-900 p-8 rounded-lg border border-zinc-800">
          <!-- Audio Visualization -->
          <div class="h-64 bg-zinc-950 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
            <div v-if="!audioBlob && !isRecording" class="text-zinc-500 flex flex-col items-center">
              <Mic class="h-12 w-12 mb-2" />
              <p>Click "Start Recording" to begin</p>
            </div>
            
            <div v-else-if="isRecording" class="w-full h-full flex items-center justify-center">
              <div class="flex items-end gap-1">
                <div 
                  v-for="i in 50" 
                  :key="i" 
                  class="bg-purple-500 w-1.5 rounded-full transform transition-all duration-75"
                  :style="`height: ${audioLevels[i % audioLevels.length]}px; animation-delay: ${i * 0.01}s`"
                ></div>
              </div>
            </div>
            
            <canvas v-else ref="visualizer" class="w-full h-full"></canvas>
          </div>
          
          <!-- Recording Controls -->
          <div class="flex flex-col gap-6">
            <div v-if="audioBlob" class="flex items-center justify-center gap-4">
              <button 
                @click="playAudio" 
                class="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
                :disabled="isPlaying"
              >
                <Play v-if="!isPlaying" class="h-5 w-5 text-purple-400" />
                <Pause v-else class="h-5 w-5 text-purple-400" />
              </button>
              
              <div class="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" 
                  :style="`width: ${playbackProgress}%`"
                ></div>
              </div>
              
              <div class="text-sm text-zinc-400">
                {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
              </div>
            </div>
            
            <div class="flex flex-wrap gap-4 justify-center">
              <button 
                v-if="!isRecording && !audioBlob"
                @click="startRecording" 
                class="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-md transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Mic class="h-5 w-5" />
                Start Recording
              </button>
              
              <button 
                v-if="isRecording"
                @click="stopRecording" 
                class="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md transition-all transform hover:scale-105 flex items-center gap-2 animate-pulse"
              >
                <Square class="h-5 w-5" />
                Stop Recording
              </button>
              
              <button 
                v-if="audioBlob"
                @click="identifySpeaker" 
                class="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-md transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <User class="h-5 w-5" />
                Identify Speaker
              </button>
              
              <button 
                v-if="audioBlob"
                @click="resetRecording" 
                class="px-6 py-3 border border-zinc-700 hover:border-purple-500 rounded-md transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <RefreshCw class="h-5 w-5" />
                Record Again
              </button>
            </div>
          </div>
          
          <!-- Results Section (shown after identification) -->
          <div v-if="identificationResult" class="mt-8 p-6 bg-zinc-950 rounded-lg border border-zinc-800 animate-fadeIn">
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
              <User class="h-5 w-5 text-purple-500" />
              Identification Results
            </h3>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-zinc-900 rounded-md">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-full bg-purple-900 flex items-center justify-center">
                    <User class="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <div class="font-medium">{{ identificationResult.name }}</div>
                    <div class="text-sm text-zinc-500">Primary Speaker</div>
                  </div>
                </div>
                <div class="text-lg font-bold text-purple-400">{{ identificationResult.confidence }}%</div>
              </div>
              
              <div v-for="(speaker, index) in identificationResult.otherSpeakers" :key="index"
                   class="flex items-center justify-between p-3 bg-zinc-900 rounded-md">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center">
                    <User class="h-6 w-6 text-zinc-400" />
                  </div>
                  <div>
                    <div class="font-medium">{{ speaker.name }}</div>
                    <div class="text-sm text-zinc-500">Possible Match</div>
                  </div>
                </div>
                <div class="text-lg font-medium text-zinc-400">{{ speaker.confidence }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { Mic, Play, Pause, Square, User, RefreshCw } from 'lucide-vue-next';

// Audio recording state
const isRecording = ref(false);
const mediaRecorder = ref(null);
const audioChunks = ref([]);
const audioBlob = ref(null);
const audioURL = ref('');
const audioElement = ref(null);
const visualizer = ref(null);
const audioContext = ref(null);
const analyser = ref(null);
const audioLevels = ref(Array(50).fill(5));

// Playback state
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const playbackProgress = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

// Identification results
const identificationResult = ref(null);

// Generate random audio levels for recording animation
const updateAudioLevels = () => {
  if (!isRecording.value) return;
  
  audioLevels.value = audioLevels.value.map(() => 
    Math.floor(Math.random() * 40) + 5
  );
  
  setTimeout(updateAudioLevels, 100);
};

// Start recording audio
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.value = new MediaRecorder(stream);
    audioChunks.value = [];
    
    mediaRecorder.value.ondataavailable = (event) => {
      audioChunks.value.push(event.data);
    };
    
    mediaRecorder.value.onstop = () => {
      const blob = new Blob(audioChunks.value, { type: 'audio/wav' });
      audioBlob.value = blob;
      audioURL.value = URL.createObjectURL(blob);
      
      // Create audio element for playback
      audioElement.value = new Audio(audioURL.value);
      audioElement.value.addEventListener('timeupdate', updatePlaybackProgress);
      audioElement.value.addEventListener('loadedmetadata', () => {
        duration.value = audioElement.value.duration;
      });
      audioElement.value.addEventListener('ended', () => {
        isPlaying.value = false;
      });
      
      // Setup audio visualization
      setupAudioVisualization();
    };
    
    mediaRecorder.value.start();
    isRecording.value = true;
    updateAudioLevels();
  } catch (error) {
    console.error('Error starting recording:', error);
  }
};

// Stop recording audio
const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop();
    isRecording.value = false;
    
    // Stop all tracks on the stream
    mediaRecorder.value.stream.getTracks().forEach(track => track.stop());
  }
};

// Reset recording state
const resetRecording = () => {
  if (audioElement.value) {
    audioElement.value.pause();
    audioElement.value.removeEventListener('timeupdate', updatePlaybackProgress);
  }
  
  audioBlob.value = null;
  audioURL.value = '';
  audioElement.value = null;
  isPlaying.value = false;
  currentTime.value = 0;
  duration.value = 0;
  identificationResult.value = null;
  
  // Clear canvas
  if (visualizer.value) {
    const ctx = visualizer.value.getContext('2d');
    ctx.clearRect(0, 0, visualizer.value.width, visualizer.value.height);
  }
};

// Play/pause audio
const playAudio = () => {
  if (!audioElement.value) return;
  
  if (isPlaying.value) {
    audioElement.value.pause();
  } else {
    audioElement.value.play();
  }
  
  isPlaying.value = !isPlaying.value;
};

// Update playback progress
const updatePlaybackProgress = () => {
  if (!audioElement.value) return;
  currentTime.value = audioElement.value.currentTime;
};

// Format time in MM:SS format
const formatTime = (seconds) => {
  if (isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Setup audio visualization
const setupAudioVisualization = () => {
  if (!visualizer.value || !audioBlob.value) return;
  
  const canvas = visualizer.value;
  const ctx = canvas.getContext('2d');
  
  // Set canvas dimensions
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  
  // Create audio context and analyser
  audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
  analyser.value = audioContext.value.createAnalyser();
  analyser.value.fftSize = 256;
  
  // Create source from audio element
  const source = audioContext.value.createMediaElementSource(audioElement.value);
  source.connect(analyser.value);
  analyser.value.connect(audioContext.value.destination);
  
  // Get frequency data
  const bufferLength = analyser.value.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw visualization
  const drawVisualization = () => {
    if (!isPlaying.value) {
      // Just draw static visualization when not playing
      analyser.value.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#9333ea'); // purple-600
        gradient.addColorStop(1, '#ec4899'); // pink-500
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
      
      requestAnimationFrame(drawVisualization);
    } else {
      analyser.value.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#9333ea'); // purple-600
        gradient.addColorStop(1, '#ec4899'); // pink-500
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
      
      requestAnimationFrame(drawVisualization);
    }
  };
  
  drawVisualization();
};

// Identify speaker (mock implementation)
const identifySpeaker = () => {
  // In a real app, you would send the audio to your backend for processing
  // with the TDNN network and MFCC coefficients
  
  // For demo purposes, we'll simulate a response after a delay
  setTimeout(() => {
    identificationResult.value = {
      name: 'John Smith',
      confidence: 92,
      otherSpeakers: [
        { name: 'Sarah Johnson', confidence: 45 },
        { name: 'Michael Chen', confidence: 23 }
      ]
    };
  }, 2000);
};

// Cleanup on component unmount
onBeforeUnmount(() => {
  if (mediaRecorder.value && mediaRecorder.value.state === 'recording') {
    mediaRecorder.value.stop();
    mediaRecorder.value.stream.getTracks().forEach(track => track.stop());
  }
  
  if (audioElement.value) {
    audioElement.value.pause();
    audioElement.value.removeEventListener('timeupdate', updatePlaybackProgress);
  }
  
  if (audioContext.value) {
    audioContext.value.close();
  }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
</script>