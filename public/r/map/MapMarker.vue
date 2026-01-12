<script setup lang="ts">
import MapLibreGL from 'maplibre-gl'
import { ref, inject, onUnmounted, provide, watch, type Ref, type ComputedRef } from 'vue'

interface MapMarkerProps {
  longitude: number
  latitude: number
  draggable?: boolean
  offset?: [number, number]
  rotation?: number
  rotationAlignment?: 'map' | 'viewport' | 'auto'
  pitchAlignment?: 'map' | 'viewport' | 'auto'
}

const props = withDefaults(defineProps<MapMarkerProps>(), {
  draggable: false,
  rotation: 0,
  rotationAlignment: 'auto',
  pitchAlignment: 'auto'
})

const emit = defineEmits<{
  click: [e: MouseEvent]
  mouseenter: [e: MouseEvent]
  mouseleave: [e: MouseEvent]
  dragStart: [lngLat: { lng: number; lat: number }]
  drag: [lngLat: { lng: number; lat: number }]
  dragEnd: [lngLat: { lng: number; lat: number }]
}>()

const map = inject<Ref<MapLibreGL.Map | null>>('map')
const isLoaded = inject<ComputedRef<boolean>>('isMapLoaded')
const markerRef = ref<HTMLDivElement | null>(null)
const marker = ref<MapLibreGL.Marker | null>(null)

// Provide marker instance to children
provide('marker', marker)
provide('markerMap', map)

const initializeMarker = () => {
  if (!map?.value || !markerRef.value || marker.value) return

  const markerInstance = new MapLibreGL.Marker({
    element: markerRef.value,
    draggable: props.draggable,
    offset: props.offset,
    rotation: props.rotation,
    rotationAlignment: props.rotationAlignment,
    pitchAlignment: props.pitchAlignment
  }).setLngLat([props.longitude, props.latitude])

  // Event listeners
  markerRef.value.addEventListener('click', (e) => emit('click', e))
  markerRef.value.addEventListener('mouseenter', (e) => emit('mouseenter', e))
  markerRef.value.addEventListener('mouseleave', (e) => emit('mouseleave', e))

  markerInstance.on('dragstart', () => {
    const lngLat = markerInstance.getLngLat()
    emit('dragStart', { lng: lngLat.lng, lat: lngLat.lat })
  })

  markerInstance.on('drag', () => {
    const lngLat = markerInstance.getLngLat()
    emit('drag', { lng: lngLat.lng, lat: lngLat.lat })
  })

  markerInstance.on('dragend', () => {
    const lngLat = markerInstance.getLngLat()
    emit('dragEnd', { lng: lngLat.lng, lat: lngLat.lat })
  })

  markerInstance.addTo(map.value)
  marker.value = markerInstance
}

// Wait for map to be loaded and ref to be ready
watch([isLoaded ?? ref(false), markerRef], ([loaded]) => {
  if (loaded && markerRef.value) {
    initializeMarker()
  }
})

// Watch for prop changes
watch(() => [props.longitude, props.latitude], ([lng, lat]) => {
  if (marker.value) {
    marker.value.setLngLat([lng as number, lat as number])
  }
})

watch(() => props.draggable, (draggable) => {
  if (marker.value) {
    marker.value.setDraggable(draggable)
  }
})

watch(() => props.offset, (offset) => {
  if (marker.value && offset) {
    marker.value.setOffset(offset)
  }
})

watch(() => props.rotation, (rotation) => {
  if (marker.value) {
    marker.value.setRotation(rotation)
  }
})

watch(() => props.rotationAlignment, (alignment) => {
  if (marker.value) {
    marker.value.setRotationAlignment(alignment)
  }
})

watch(() => props.pitchAlignment, (alignment) => {
  if (marker.value) {
    marker.value.setPitchAlignment(alignment)
  }
})

onUnmounted(() => {
  if (marker.value) {
    marker.value.remove()
  }
})
</script>

<template>
  <div ref="markerRef">
    <slot />
  </div>
</template>
