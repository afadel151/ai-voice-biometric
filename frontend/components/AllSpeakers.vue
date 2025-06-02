<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" class="flex items-center gap-2 bg-white/10 text-white hover:bg-white/20 border-white/20">
        <Users class="h-5 w-5 text-purple-400" />
        See speakers
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-96 bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-xl p-6">
      <div v-if="!isLoading && speakers.length" class="text-center">
        <div class="relative mb-6">
          <div class="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto">
            <Users class="h-12 w-12 text-purple-400" />
          </div>
          <div class="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-20 animate-ping"></div>
          <div class="absolute inset-4 bg-pink-400 rounded-full blur-xl opacity-15 animate-ping animation-delay-1000"></div>
        </div>
        <h3 class="text-lg font-bold text-white mb-3">Registered Speakers</h3>
        <p class="text-white/60 text-base mb-4">Total: {{ speakers.length }} speakers</p>
        <div class="grid grid-cols-1 gap-3">
          <div v-for="speaker in speakers" :key="speaker"
               class="backdrop-blur-sm bg-white/10 p-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div class="flex items-center gap-2">
              <User class="h-5 w-5 text-purple-400" />
              <span class="text-white font-medium">{{ speaker }}</span>
            </div>
          </div>
        </div>
        <p class="text-white/40 mt-4 text-sm">Click "Start Recording" to begin voice capture</p>
      </div>
      <div v-else-if="isLoading" class="text-center">
        <div class="relative mb-6">
          <div class="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto">
            <Loader2 class="h-12 w-12 text-purple-400 animate-spin" />
          </div>
        </div>
        <p class="text-white/60 text-base">Loading speakers...</p>
      </div>
      <div v-else class="text-center">
        <div class="relative mb-6">
          <div class="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto">
            <Users class="h-12 w-12 text-purple-400" />
          </div>
          <div class="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-20 animate-ping"></div>
          <div class="absolute inset-4 bg-pink-400 rounded-full blur-xl opacity-15 animate-ping animation-delay-1000"></div>
        </div>
        <p class="text-white/60 text-base">No speakers registered</p>
        <p class="text-white/40 mt-2 text-sm">Click "Start Recording" to begin voice capture</p>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Users, User, Loader2 } from 'lucide-vue-next'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

const speakers = ref([])
const isLoading = ref(true)

const fetchSpeakers = async () => {
  try {
    isLoading.value = true
    const response = await fetch('http://127.0.0.1:8000/speakers')
    if (!response.ok) throw new Error('Failed to fetch speakers')
    const data = await response.json()
    speakers.value = data.speakers || []
  } catch (error) {
    console.error('Error fetching speakers:', error)
    speakers.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchSpeakers()
})
</script>

<style scoped>
/* Ensure Tailwind animation delay utility works */
.animation-delay-1000 {
  animation-delay: 1000ms;
}
</style>