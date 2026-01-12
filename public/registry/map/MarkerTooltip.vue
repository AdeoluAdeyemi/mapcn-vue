<script setup lang="ts">
import MapLibreGL from 'maplibre-gl'
import { ref, inject, onMounted, onUnmounted, watch, type Ref } from 'vue'
import { cn } from '@/lib/utils'

interface MarkerTooltipProps {
  className?: string
  offset?: number | [number, number]
  maxWidth?: string
}

const props = withDefaults(defineProps<MarkerTooltipProps>(), {
  offset: 16,
  maxWidth: 'none'
})

const marker = inject<Ref<MapLibreGL.Marker | null>>('marker')
const map = inject<Ref<MapLibreGL.Map | null>>('markerMap')
const containerRef = ref<HTMLDivElement | null>(null)
const tooltip = ref<MapLibreGL.Popup | null>(null)

onMounted(() => {
  if (!map?.value || !marker?.value) return

  const container = document.createElement('div')
  containerRef.value = container

  const tooltipInstance = new MapLibreGL.Popup({
    offset: props.offset,
    maxWidth: props.maxWidth,
    closeOnClick: true,
    closeButton: false
  }).setMaxWidth('none')

  tooltip.value = tooltipInstance

  const markerElement = marker.value.getElement()
  if (markerElement) {
    markerElement.addEventListener('mouseenter', () => {
      if (marker.value && map.value) {
        tooltipInstance.setDOMContent(container)
        tooltipInstance.setLngLat(marker.value.getLngLat()).addTo(map.value)
      }
    })
    markerElement.addEventListener('mouseleave', () => {
      tooltipInstance.remove()
    })
  }
})

watch(() => props.offset, (offset) => {
  if (tooltip.value && tooltip.value.isOpen()) {
    tooltip.value.setOffset(offset)
  }
})

watch(() => props.maxWidth, (maxWidth) => {
  if (tooltip.value && tooltip.value.isOpen() && maxWidth) {
    tooltip.value.setMaxWidth(maxWidth)
  }
})

onUnmounted(() => {
  if (tooltip.value) {
    tooltip.value.remove()
  }
})
</script>

<template>
  <Teleport v-if="containerRef" :to="containerRef">
    <div
      :class="cn(
        'rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md animate-in fade-in-0 zoom-in-95',
        className
      )"
    >
      <slot />
    </div>
  </Teleport>
</template>
