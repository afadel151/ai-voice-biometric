<template>
  <div>
    <!-- Add Speaker Button -->
    <button @click="openDialog" :disabled="!audioBlob"
      class="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 flex items-center justify-center gap-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
      <UserPlus class="h-5 w-5" />
      Add Speaker
    </button>

    <!-- shadcn-vue Dialog -->
    <Dialog :open="showDialog" @update:open="handleDialogChange">
      <DialogContent class="max-w-md">
        <!-- Custom styled dialog content -->
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          
          <div class="relative backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20">
            <!-- Header -->
            <DialogHeader class="mb-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <UserPlus class="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <DialogTitle class="text-xl font-bold text-white">Add New Speaker</DialogTitle>
                  <DialogDescription class="text-white/60 text-sm">Register this voice in the database</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <!-- Form -->
            <form @submit.prevent="submitSpeaker" class="space-y-6">
              <!-- Speaker Name Input -->
              <div>
                <label for="speakerName" class="block text-sm font-medium text-white/80 mb-2">
                  Speaker Name
                </label>
                <div class="relative">
                  <input
                    id="speakerName"
                    v-model="speakerName"
                    type="text"
                    placeholder="Enter speaker's full name"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                    :class="{ 'border-red-500/50 focus:ring-red-500/50': validationError }"
                    :disabled="isSubmitting"
                    maxlength="50"
                    required
                    aria-describedby="speakerNameError"
                  />
                  <User class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                </div>
                <div class="flex justify-between items-center mt-1">
                  <p v-if="validationError" id="speakerNameError" class="text-red-400 text-sm">{{ validationError }}</p>
                  <span class="text-white/40 text-xs ml-auto">{{ speakerName.length }}/50</span>
                </div>
              </div>

              <!-- Audio Info -->
              <div class="space-y-3">
                <h4 class="text-sm font-medium text-white/80">Audio Information</h4>
                <div class="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-white/60">Duration:</span>
                      <span class="text-white font-mono">{{ formatDuration(audioDuration) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-white/60">Format:</span>
                      <span class="text-white font-mono">MP4 (AAC)</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-white/60">Quality:</span>
                      <span class="text-emerald-400 font-medium">
                        {{ getQualityText(audioDuration) }}
                      </span>
                    </div>
                  </div>

                  <!-- Quality Indicator -->
                  <div class="mt-3">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs text-white/60">Recording Quality:</span>
                      <div class="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          class="h-full rounded-full transition-all duration-500"
                          :class="getQualityBarClass(audioDuration)"
                          :style="`width: ${getQualityPercentage(audioDuration)}%`">
                        </div>
                      </div>
                    </div>
                    <p class="text-xs text-white/50">{{ getQualityMessage(audioDuration) }}</p>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <DialogFooter class="flex gap-3 pt-4">
                <DialogClose as-child>
                  <button
                    type="button"
                    :disabled="isSubmitting"
                    class="flex-1 px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white border border-white/20 hover:border-white/30 disabled:border-white/10 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-medium disabled:opacity-50"
                    aria-label="Cancel adding speaker">
                    <X class="h-4 w-4" />
                    Cancel
                  </button>
                </DialogClose>
                <button
                  type="submit"
                  :disabled="!canSubmit || isSubmitting"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Submit speaker">
                  <Loader2 v-if="isSubmitting" class="h-4 w-4 animate-spin" />
                  <Check v-else class="h-4 w-4" />
                  {{ isSubmitting ? 'Adding...' : 'Add Speaker' }}
                </button>
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Success/Error Toast -->
    <div v-if="showToast" 
      class="fixed top-4 right-4 z-60 transform transition-all duration-300"
      :class="{ 'translate-x-full': !showToast }">
      <div class="relative group">
        <div class="absolute -inset-1 rounded-2xl blur opacity-25"
          :class="toastType === 'success' ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-red-600 to-rose-600'">
        </div>
        <div class="relative backdrop-blur-xl p-4 rounded-2xl border max-w-sm"
          :class="toastType === 'success' 
            ? 'bg-green-900/20 border-green-500/30' 
            : 'bg-red-900/20 border-red-500/30'">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full flex items-center justify-center"
              :class="toastType === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'">
              <CheckCircle v-if="toastType === 'success'" class="h-5 w-5 text-green-400" />
              <AlertCircle v-else class="h-5 w-5 text-red-400" />
            </div>
            <div class="flex-1">
              <p class="font-medium text-white text-sm">{{ toastMessage }}</p>
            </div>
            <button @click="hideToast" 
              class="p-1 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close toast">
              <X class="h-4 w-4 text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { UserPlus, User, X, Check, Loader2, CheckCircle, AlertCircle } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'

// Props
const props = defineProps({
  audioBlob: {
    type: Blob,
    default: null
  },
  audioDuration: {
    type: Number,
    default: 0
  }
})

// Reactive state
const showDialog = ref(false)
const speakerName = ref('')
const isSubmitting = ref(false)
const validationError = ref('')
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success') // 'success' or 'error'

// Computed properties
const canSubmit = computed(() => {
  return speakerName.value.trim().length >= 2 && 
         speakerName.value.trim().length <= 50 && 
         props.audioBlob && 
         props.audioDuration >= 3
})

// Validation watcher
watch(speakerName, (newName) => {
  validationError.value = ''
  
  if (newName.trim().length === 0) {
    return
  }
  
  if (newName.trim().length < 2) {
    validationError.value = 'Name must be at least 2 characters'
  } else if (newName.trim().length > 50) {
    validationError.value = 'Name must be less than 50 characters'
  } else if (!/^[a-zA-Z\s\-'\.]+$/.test(newName.trim())) {
    validationError.value = 'Name can only contain letters, spaces, hyphens, apostrophes, and periods'
  }
})

// Dialog methods
const openDialog = () => {
  if (!props.audioBlob || !(props.audioBlob instanceof Blob)) {
    showToastMessage('No valid audio file provided', 'error')
    return
  }
  showDialog.value = true
  speakerName.value = ''
  validationError.value = ''
}

const handleDialogChange = (open) => {
  if (!open && !isSubmitting.value) {
    showDialog.value = false
    speakerName.value = ''
    validationError.value = ''
  }
}

// Toast methods
const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    hideToast()
  }, 5000)
}

const hideToast = () => {
  showToast.value = false
}

// Audio quality helpers
const formatDuration = (seconds) => {
  if (isNaN(seconds)) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const getQualityText = (duration) => {
  if (duration >= 10) return 'Excellent'
  if (duration >= 5) return 'Good'
  if (duration >= 3) return 'Fair'
  return 'Poor'
}

const getQualityBarClass = (duration) => {
  if (duration >= 10) return 'bg-gradient-to-r from-green-500 to-emerald-500'
  if (duration >= 5) return 'bg-gradient-to-r from-yellow-500 to-orange-500'
  if (duration >= 3) return 'bg-gradient-to-r from-orange-500 to-red-500'
  return 'bg-gradient-to-r from-red-500 to-red-600'
}

const getQualityPercentage = (duration) => {
  if (duration >= 10) return 100
  if (duration >= 5) return 75
  if (duration >= 3) return 50
  return 25
}

const getQualityMessage = (duration) => {
  if (duration >= 10) return 'Perfect for accurate speaker identification'
  if (duration >= 5) return 'Good quality for speaker identification'
  if (duration >= 3) return 'Minimum quality for speaker identification'
  return 'Recording too short for reliable identification'
}

// Submit speaker
const submitSpeaker = async () => {
  if (!canSubmit.value || isSubmitting.value) return;
  if (!props.audioBlob || !(props.audioBlob instanceof Blob)) {
    showToastMessage('Invalid audio file provided', 'error');
    return;
  }
  if (!speakerName.value.trim()) {
    showToastMessage('Speaker name cannot be empty', 'error');
    return;
  }
  if (props.audioBlob.size > 10 * 1024 * 1024) {
    showToastMessage('Audio file exceeds 10MB limit', 'error');
    return;
  }
  if (!['video/mp4', 'audio/mp4'].includes(props.audioBlob.type)) {
    showToastMessage('Only MP4 or M4A files are supported', 'error');
    return;
  }

  isSubmitting.value = true;
  try {
    const formData = new FormData();
    formData.append('speaker_name', speakerName.value.trim());
    formData.append('file', props.audioBlob, 'recording.mp4');

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${backendUrl}/add_speaker`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log('Response:', result); // Log for debugging

    if (response.ok) {
      showToastMessage(`Speaker "${speakerName.value.trim()}" added successfully!`, 'success');
      showDialog.value = false;
      speakerName.value = '';
      validationError.value = '';
    } else {
      throw new Error(result.detail || result.error || 'Failed to add speaker');
    }
  } catch (error) {
    console.error('Error adding speaker:', error);
    showToastMessage(error.message || 'Failed to add speaker. Please try again.', 'error');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Custom scrollbar for potential overflow */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Ensure proper z-index layering */
.z-60 {
  z-index: 60;
}

/* Input focus styles */
input:focus {
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}
</style>