<script setup lang="ts">
import MapLibreGL from 'maplibre-gl'
import { inject, onUnmounted, watch, computed, ref, type Ref, type ComputedRef } from 'vue'

interface MapRouteProps {
  id?: string
  coordinates: [number, number][]
  color?: string
  width?: number
  opacity?: number
  dashArray?: [number, number]
  interactive?: boolean
}

const props = withDefaults(defineProps<MapRouteProps>(), {
  color: '#4285F4',
  width: 3,
  opacity: 0.8,
  interactive: true
})

const emit = defineEmits<{
  click: []
  mouseenter: []
  mouseleave: []
}>()

const map = inject<Ref<MapLibreGL.Map | null>>('map')
const isLoaded = inject<ComputedRef<boolean>>('isMapLoaded')

const generateId = () => `route-${Math.random().toString(36).substr(2, 9)}`
const id = computed(() => props.id || generateId())
const sourceId = computed(() => `route-source-${id.value}`)
const layerId = computed(() => `route-layer-${id.value}`)

const isInitialized = ref(false)

const initializeRoute = () => {
  if (!map?.value || isInitialized.value) return

  const mapInstance = map.value

  // Add source
  mapInstance.addSource(sourceId.value, {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: { type: 'LineString', coordinates: props.coordinates }
    }
  })

  // Add layer
  mapInstance.addLayer({
    id: layerId.value,
    type: 'line',
    source: sourceId.value,
    layout: { 'line-join': 'round', 'line-cap': 'round' },
    paint: {
      'line-color': props.color,
      'line-width': props.width,
      'line-opacity': props.opacity,
      ...(props.dashArray && { 'line-dasharray': props.dashArray })
    }
  })

  // Event handlers
  const handleClick = () => emit('click')
  const handleMouseEnter = () => {
    mapInstance.getCanvas().style.cursor = 'pointer'
    emit('mouseenter')
  }
  const handleMouseLeave = () => {
    mapInstance.getCanvas().style.cursor = ''
    emit('mouseleave')
  }

  if (props.interactive) {
    mapInstance.on('click', layerId.value, handleClick)
    mapInstance.on('mouseenter', layerId.value, handleMouseEnter)
    mapInstance.on('mouseleave', layerId.value, handleMouseLeave)
  }

  isInitialized.value = true
}

// Watch for map to be loaded
watch(isLoaded ?? ref(false), (loaded) => {
  if (loaded) {
    initializeRoute()
  }
}, { immediate: true })

onUnmounted(() => {
  if (!map?.value || !isInitialized.value) return
  
  const mapInstance = map.value
  try {
    if (mapInstance.getLayer(layerId.value)) mapInstance.removeLayer(layerId.value)
    if (mapInstance.getSource(sourceId.value)) mapInstance.removeSource(sourceId.value)
  } catch {
    // ignore
  }
})

// Update coordinates
watch(() => props.coordinates, (coordinates) => {
  if (!isInitialized.value || !map?.value || coordinates.length < 2) return

  const source = map.value.getSource(sourceId.value) as MapLibreGL.GeoJSONSource
  if (source) {
    source.setData({
      type: 'Feature',
      properties: {},
      geometry: { type: 'LineString', coordinates }
    })
  }
})

// Update styles
watch(() => [props.color, props.width, props.opacity, props.dashArray], () => {
  if (!isInitialized.value || !map?.value || !map.value.getLayer(layerId.value)) return

  map.value.setPaintProperty(layerId.value, 'line-color', props.color)
  map.value.setPaintProperty(layerId.value, 'line-width', props.width)
  map.value.setPaintProperty(layerId.value, 'line-opacity', props.opacity)
  if (props.dashArray) {
    map.value.setPaintProperty(layerId.value, 'line-dasharray', props.dashArray)
  }
})
</script>

<template>
  <!-- Route is rendered directly to the map, no template needed -->
</template>
