<script setup lang="ts">
import MapLibreGL from 'maplibre-gl'
import { ref, inject, onMounted, onUnmounted, watch, type Ref } from 'vue'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface MarkerPopupProps {
  className?: string
  closeButton?: boolean
  offset?: number | [number, number]
  maxWidth?: string
}

const props = withDefaults(defineProps<MarkerPopupProps>(), {
  closeButton: false,
  offset: 16,
  maxWidth: 'none'
})

const marker = inject<Ref<MapLibreGL.Marker | null>>('marker')
const map = inject<Ref<MapLibreGL.Map | null>>('markerMap')
const containerRef = ref<HTMLDivElement | null>(null)
const popup = ref<MapLibreGL.Popup | null>(null)

onMounted(() => {
  if (!map?.value || !marker?.value) return

  const container = document.createElement('div')
  containerRef.value = container

  const popupInstance = new MapLibreGL.Popup({
    offset: props.offset,
    maxWidth: props.maxWidth,
    closeButton: false
  }).setMaxWidth('none').setDOMContent(container)

  marker.value.setPopup(popupInstance)
  popup.value = popupInstance
})

watch(() => props.offset, (offset) => {
  if (popup.value && popup.value.isOpen()) {
    popup.value.setOffset(offset)
  }
})

watch(() => props.maxWidth, (maxWidth) => {
  if (popup.value && popup.value.isOpen() && maxWidth) {
    popup.value.setMaxWidth(maxWidth)
  }
})

const handleClose = () => {
  if (popup.value) {
    popup.value.remove()
  }
}

onUnmounted(() => {
  if (marker?.value) {
    marker.value.setPopup(null)
  }
})
</script>

<template>
  <Teleport v-if="containerRef" :to="containerRef">
    <div
      :class="cn(
        'relative rounded-md border bg-popover p-3 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
        className
      )"
    >
      <button
        v-if="closeButton"
        type="button"
        @click="handleClose"
        class="absolute top-1 right-1 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Close popup"
      >
        <X class="h-4 w-4" />
        <span class="sr-only">Close</span>
      </button>
      <slot />
    </div>
  </Teleport>
</template>
