<template>
  <div class="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
    <div class="container mx-auto max-w-4xl">
      <h1 class="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        <span class="text-indigo-600 dark:text-indigo-400">Speaker Identification</span>
      </h1>
      
      <div class="relative bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl">
        <!-- Audio Visualization -->
        <div class="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
          <div v-if="!audioBlob && !isRecording" class="text-gray-500 dark:text-gray-400 flex flex-col items-center">
            <Mic class="h-12 w-12 mb-2" />
            <p>Click "Start Recording" to begin</p>
          </div>
          
          <!-- Live recording visualization -->
          <div v-else-if="isRecording" class="w-full h-full flex items-center justify-center p-4">
            <div class="flex items-end gap-1 w-full h-full">
              <div 
                v-for="(level, i) in liveAudioLevels" 
                :key="i" 
                class="bg-indigo-500 dark:bg-indigo-400 w-2 rounded-full transition-all duration-75 ease-in-out"
                :style="`height: ${level}%`"
              ></div>
            </div>
          </div>
          
          <!-- Playback or static waveform visualization -->
          <canvas 
            v-else 
            ref="visualizer" 
            class="w-full h-full bg-gray-200 dark:bg-gray-900"
            style="min-height: 256px;"
          ></canvas>
        </div>
        
        <!-- Recording Controls -->
        <div class="flex flex-col gap-6">
          <div v-if="audioBlob" class="flex items-center justify-center gap-4">
            <button 
              @click="playAudio" 
              class="p-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-all duration-300"
              :disabled="isPlaying"
            >
              <Play v-if="!isPlaying" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <Pause v-else class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </button>
            
            <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300" 
                :style="`width: ${playbackProgress}%`"
              ></div>
            </div>
            
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4 justify-center">
            <button 
              v-if="!isRecording && !audioBlob"
              @click="startRecording" 
              class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-300 hover:shadow-md flex items-center gap-2"
            >
              <Mic class="h-5 w-5" />
              Start Recording
            </button>
            
            <button 
              v-if="isRecording"
              @click="stopRecording" 
              class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-all duration-300 hover:shadow-md flex items-center gap-2"
            >
              <Square class="h-5 w-5" />
              Stop Recording
            </button>
            
            <button 
              v-if="audioBlob"
              @click="identifySpeaker" 
              class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-300 hover:shadow-md flex items-center gap-2"
            >
              <User class="h-5 w-5" />
              Identify Speaker
            </button>
            
            <button 
              v-if="audioBlob"
              @click="resetRecording" 
              class="px-6 py-3 border border-gray-300 hover:border-indigo-500 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-md transition-all duration-300 hover:shadow-md flex items-center gap-2"
            >
              <RefreshCw class="h-5 w-5" />
              Record Again
            </button>
          </div>
        </div>
        
        <!-- Results Section -->
        <div 
          v-if="identificationResult" 
          class="mt-8 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 ease-out"
          :class="resultAnimation"
        >
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <User class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Identification Results
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <User class="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">{{ identificationResult.name }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Primary Speaker</div>
                </div>
              </div>
              <div class="text-lg font-bold text-indigo-600 dark:text-indigo-400">{{ identificationResult.confidence }}%</div>
            </div>
            
            <div 
              v-for="(speaker, index) in identificationResult.otherSpeakers" 
              :key="index"
              class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm"
            >
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <User class="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">{{ speaker.name }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Possible Match</div>
                </div>
              </div>
              <div class="text-lg font-medium text-gray-600 dark:text-gray-400">{{ speaker.confidence }}%</div>
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
const liveAudioLevels = ref(Array(50).fill(5));
const resultAnimation = ref('opacity-0 translate-y-4');

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

// Waveform data
const waveformData = ref([]);

// Start recording audio
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.value = new MediaRecorder(stream);
    audioChunks.value = [];
    
    // Setup audio context for live visualization
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.value.createMediaStreamSource(stream);
    analyser.value = audioContext.value.createAnalyser();
    analyser.value.fftSize = 64;
    source.connect(analyser.value);
    
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
        console.log('Audio metadata loaded, duration:', duration.value);
        // Process waveform after metadata is loaded
        processWaveform();
      });
      audioElement.value.addEventListener('ended', () => {
        isPlaying.value = false;
      });
      
      // Setup audio visualization
      setupAudioVisualization();
    };
    
    mediaRecorder.value.start();
    isRecording.value = true;
    updateLiveVisualization();
  } catch (error) {
    console.error('Error starting recording:', error);
  }
};

// Update live visualization during recording
const updateLiveVisualization = () => {
  if (!isRecording.value || !analyser.value) return;
  
  const dataArray = new Uint8Array(analyser.value.frequencyBinCount);
  analyser.value.getByteFrequencyData(dataArray);
  
  // Normalize levels and update the array
  const levels = [];
  for (let i = 0; i < 50; i++) {
    const index = Math.floor(i / 50 * dataArray.length);
    levels.push(Math.max(5, Math.min(100, dataArray[index] / 2)));
  }
  liveAudioLevels.value = levels;
  
  requestAnimationFrame(updateLiveVisualization);
};

// Stop recording audio
const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop();
    isRecording.value = false;
    
    // Stop all tracks on the stream
    mediaRecorder.value.stream.getTracks().forEach(track => track.stop());
    
    // Close audio context
    if (audioContext.value) {
      audioContext.value.close();
      audioContext.value = null;
      analyser.value = null;
    }
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
  resultAnimation.value = 'opacity-0 translate-y-4';
  waveformData.value = [];
  
  // Clear canvas
  if (visualizer.value) {
    const ctx = visualizer.value.getContext('2d');
    ctx.clearRect(0, 0, visualizer.value.width, visualizer.value.height);
  }
};

// Play/pause audio
const playAudio = () => {
  if (!audioElement.value) {
    console.error('No audio element available');
    return;
  }
  
  if (isPlaying.value) {
    audioElement.value.pause();
    console.log('Pausing audio');
  } else {
    audioElement.value.play().then(() => {
      console.log('Playing audio');
    }).catch((error) => {
      console.error('Error playing audio:', error);
    });
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

// Process waveform data from audio blob
const processWaveform = async () => {
  if (!audioBlob.value || !visualizer.value) return;

  try {
    const arrayBuffer = await audioBlob.value.arrayBuffer();
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await audioContext.value.decodeAudioData(arrayBuffer);

    // Get raw audio data (mono channel)
    const rawData = audioBuffer.getChannelData(0); // Use first channel for mono
    const samples = Math.floor(visualizer.value.offsetWidth); // One sample per pixel
    const blockSize = Math.floor(rawData.length / samples); // Samples per pixel
    const filteredData = [];

    // Downsample by taking max amplitude per block
    for (let i = 0; i < samples; i++) {
      let blockStart = i * blockSize;
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum += Math.abs(rawData[blockStart + j] || 0);
      }
      filteredData.push(sum / blockSize);
    }

    // Normalize data
    const maxAmplitude = Math.max(...filteredData);
    if (maxAmplitude > 0) {
      waveformData.value = filteredData.map(value => (value / maxAmplitude) * 0.8); // Scale to 80% height
    } else {
      waveformData.value = filteredData;
    }

    // Draw waveform immediately
    drawWaveform();
  } catch (error) {
    console.error('Error processing waveform:', error);
  }
};

// Draw static waveform
const drawWaveform = () => {
  if (!visualizer.value || !waveformData.value.length) return;

  const canvas = visualizer.value;
  const ctx = canvas.getContext('2d');

  // Set canvas dimensions
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Clear canvas
  ctx.fillStyle = '#e5e7eb'; // bg-gray-200
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw waveform
  ctx.beginPath();
  ctx.strokeStyle = '#4f46e5'; // indigo-600
  ctx.lineWidth = 2;

  const centerY = canvas.height / 2;
  const widthSy = canvas.height / 2;
  const sliceWidth = canvas.width / waveformData.value.length;

  for (let i = 0; i < waveformData.value.length; i++) {
    const x = i * sliceWidth;
    const y = centerY - (waveformData.value[i] * centerY);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
};

// Setup audio visualization
const setupAudioVisualization = () => {
  if (!visualizer.value || !audioBlob.value || !audioElement.value) {
    console.error('Visualizer setup failed: Missing canvas, audioBlob, or audioElement');
    return;
  }

  const canvas = visualizer.value;
  const ctx = canvas.getContext('2d');

  // Ensure canvas dimensions are set correctly
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  if (canvas.width === 0 || canvas.height === 0) {
    console.error('Canvas has invalid dimensions:', canvas.width, canvas.height);
    return;
  }

  // Draw static waveform initially
  drawWaveform();

  // Create audio context
  audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.value.state === 'suspended') {
    audioContext.value.resume().then(() => {
      console.log('AudioContext resumed');
    });
  }

  // Set up analyser for playback visualization
  analyser.value = audioContext.value.createAnalyser();
  analyser.value.fftSize = 256;
  const bufferLength = analyser.value.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  // Connect audio element to analyser
  try {
    const source = audioContext.value.createMediaElementSource(audioElement.value);
    source.connect(analyser.value);
    analyser.value.connect(audioContext.value.destination);
  } catch (error) {
    console.error('Error connecting audio source:', error);
    return;
  }

  // Draw real-time visualization during playback
  const drawVisualization = () => {
    if (!isPlaying.value || !analyser.value) {
      drawWaveform(); // Re-draw static waveform when not playing
      return;
    }

    analyser.value.getByteFrequencyData(dataArray);

    ctx.fillStyle = '#e5e7eb'; // bg-gray-200
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height;

      const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
      gradient.addColorStop(0, '#4f46e5'); // indigo-600
      gradient.addColorStop(1, '#6366f1'); // indigo-500

      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }

    requestAnimationFrame(drawVisualization);
  };

  // Start visualization on play
  audioElement.value.addEventListener('play', () => {
    console.log('Audio play event triggered, starting visualization');
    isPlaying.value = true;
    drawVisualization();
  });

  // Stop visualization on pause or end
  audioElement.value.addEventListener('pause', () => {
    console.log('Audio paused');
    isPlaying.value = false;
  });
  audioElement.value.addEventListener('ended', () => {
    console.log('Audio ended');
    isPlaying.value = false;
  });
};

// Identify speaker (mock implementation)
const identifySpeaker = () => {
  setTimeout(() => {
    identificationResult.value = {
      name: 'John Smith',
      confidence: 92,
      otherSpeakers: [
        { name: 'Sarah Johnson', confidence: 45 },
        { name: 'Michael Chen', confidence: 23 }
      ]
    };
    
    resultAnimation.value = 'opacity-100 translate-y-0';
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
</script>

<style scoped>
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
.translate-y-4 {
  transform: translateY(1rem);
}
.translate-y-0 {
  transform: translateY(0);
}
</style>