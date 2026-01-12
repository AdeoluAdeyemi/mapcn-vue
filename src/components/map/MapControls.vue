<script setup lang="ts">
import MapLibreGL from 'maplibre-gl'
import { ref, inject, onMounted, onUnmounted, type Ref, type ComputedRef } from 'vue'
import { Plus, Minus, Locate, Maximize, Loader2 } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface MapControlsProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  showZoom?: boolean
  showCompass?: boolean
  showLocate?: boolean
  showFullscreen?: boolean
  className?: string
}

const props = withDefaults(defineProps<MapControlsProps>(), {
  position: 'bottom-right',
  showZoom: true,
  showCompass: false,
  showLocate: false,
  showFullscreen: false
})

const emit = defineEmits<{
  locate: [coords: { longitude: number; latitude: number }]
}>()

const map = inject<Ref<MapLibreGL.Map | null>>('map')
const isLoaded = inject<ComputedRef<boolean>>('isMapLoaded')
const waitingForLocation = ref(false)
const compassRef = ref<SVGSVGElement | null>(null)

const positionClasses = {
  'top-left': 'top-2 left-2',
  'top-right': 'top-2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-right': 'bottom-10 right-2'
}

const handleZoomIn = () => {
  if (map?.value) {
    map.value.zoomTo(map.value.getZoom() + 1, { duration: 300 })
  }
}

const handleZoomOut = () => {
  if (map?.value) {
    map.value.zoomTo(map.value.getZoom() - 1, { duration: 300 })
  }
}

const handleResetBearing = () => {
  if (map?.value) {
    map.value.resetNorthPitch({ duration: 300 })
  }
}

const handleLocate = () => {
  waitingForLocation.value = true
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude
        }
        map?.value?.flyTo({
          center: [coords.longitude, coords.latitude],
          zoom: 14,
          duration: 1500
        })
        emit('locate', coords)
        waitingForLocation.value = false
      },
      (error) => {
        console.error('Error getting location:', error)
        waitingForLocation.value = false
      }
    )
  }
}

const handleFullscreen = () => {
  const container = map?.value?.getContainer()
  if (!container) return
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    container.requestFullscreen()
  }
}

// Compass rotation effect
onMounted(() => {
  if (!props.showCompass || !isLoaded?.value || !map?.value || !compassRef.value) return

  const compass = compassRef.value
  const mapInstance = map.value

  const updateRotation = () => {
    const bearing = mapInstance.getBearing()
    const pitch = mapInstance.getPitch()
    compass.style.transform = `rotateX(${pitch}deg) rotateZ(${-bearing}deg)`
  }

  mapInstance.on('rotate', updateRotation)
  mapInstance.on('pitch', updateRotation)
  updateRotation()

  onUnmounted(() => {
    mapInstance.off('rotate', updateRotation)
    mapInstance.off('pitch', updateRotation)
  })
})
</script>

<template>
  <div
    v-if="isLoaded"
    :class="cn(
      'absolute z-10 flex flex-col gap-1.5',
      positionClasses[position],
      className
    )"
  >
    <!-- Zoom controls -->
    <div v-if="showZoom" class="flex flex-col rounded-md border border-border bg-background shadow-sm overflow-hidden">
      <button
        @click="handleZoomIn"
        aria-label="Zoom in"
        type="button"
        class="flex items-center justify-center size-8 hover:bg-accent dark:hover:bg-accent/40 transition-colors border-b border-border"
      >
        <Plus class="size-4" />
      </button>
      <button
        @click="handleZoomOut"
        aria-label="Zoom out"
        type="button"
        class="flex items-center justify-center size-8 hover:bg-accent dark:hover:bg-accent/40 transition-colors"
      >
        <Minus class="size-4" />
      </button>
    </div>

    <!-- Compass control -->
    <div v-if="showCompass" class="flex flex-col rounded-md border border-border bg-background shadow-sm overflow-hidden">
      <button
        @click="handleResetBearing"
        aria-label="Reset bearing to north"
        type="button"
        class="flex items-center justify-center size-8 hover:bg-accent dark:hover:bg-accent/40 transition-colors"
      >
        <svg
          ref="compassRef"
          viewBox="0 0 24 24"
          class="size-5 transition-transform duration-200"
          style="transform-style: preserve-3d"
        >
          <path d="M12 2L16 12H12V2Z" class="fill-red-500" />
          <path d="M12 2L8 12H12V2Z" class="fill-red-300" />
          <path d="M12 22L16 12H12V22Z" class="fill-muted-foreground/60" />
          <path d="M12 22L8 12H12V22Z" class="fill-muted-foreground/30" />
        </svg>
      </button>
    </div>

    <!-- Locate control -->
    <div v-if="showLocate" class="flex flex-col rounded-md border border-border bg-background shadow-sm overflow-hidden">
      <button
        @click="handleLocate"
        aria-label="Find my location"
        type="button"
        :disabled="waitingForLocation"
        :class="cn(
          'flex items-center justify-center size-8 hover:bg-accent dark:hover:bg-accent/40 transition-colors',
          waitingForLocation && 'opacity-50 pointer-events-none cursor-not-allowed'
        )"
      >
        <Loader2 v-if="waitingForLocation" class="size-4 animate-spin" />
        <Locate v-else class="size-4" />
      </button>
    </div>

    <!-- Fullscreen control -->
    <div v-if="showFullscreen" class="flex flex-col rounded-md border border-border bg-background shadow-sm overflow-hidden">
      <button
        @click="handleFullscreen"
        aria-label="Toggle fullscreen"
        type="button"
        class="flex items-center justify-center size-8 hover:bg-accent dark:hover:bg-accent/40 transition-colors"
      >
        <Maximize class="size-4" />
      </button>
    </div>
  </div>
</template>
