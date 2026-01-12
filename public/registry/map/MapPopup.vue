<script setup lang="ts">
import MapLibreGL from 'maplibre-gl'
import { ref, inject, onMounted, onUnmounted, watch, type Ref } from 'vue'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface MapPopupProps {
  longitude: number
  latitude: number
  className?: string
  closeButton?: boolean
  offset?: number | [number, number]
  maxWidth?: string
}

const props = withDefaults(defineProps<MapPopupProps>(), {
  closeButton: false,
  offset: 16,
  maxWidth: 'none'
})

const emit = defineEmits<{
  close: []
}>()

const map = inject<Ref<MapLibreGL.Map | null>>('map')
const containerRef = ref<HTMLDivElement | null>(null)
const popup = ref<MapLibreGL.Popup | null>(null)

onMounted(() => {
  if (!map?.value) return

  const container = document.createElement('div')
  containerRef.value = container

  const popupInstance = new MapLibreGL.Popup({
    offset: props.offset,
    maxWidth: props.maxWidth,
    closeButton: false
  })
    .setMaxWidth('none')
    .setLngLat([props.longitude, props.latitude])
    .setDOMContent(container)

  popupInstance.on('close', () => emit('close'))
  popupInstance.addTo(map.value)
  popup.value = popupInstance
})

watch(() => [props.longitude, props.latitude], ([lng, lat]) => {
  if (popup.value && popup.value.isOpen()) {
    popup.value.setLngLat([lng as number, lat as number])
  }
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
    emit('close')
  }
}

onUnmounted(() => {
  if (popup.value && popup.value.isOpen()) {
    popup.value.remove()
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
