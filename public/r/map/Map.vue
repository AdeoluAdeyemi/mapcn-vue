<script setup lang="ts">
import MapLibreGL, { type ProjectionSpecification, type MapOptions } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { ref, onMounted, onUnmounted, provide, watch, computed } from 'vue'
import { useDark } from '@vueuse/core'

type MapStyleOption = string | MapLibreGL.StyleSpecification

interface MapProps {
  styles?: {
    light?: MapStyleOption
    dark?: MapStyleOption
  }
  projection?: ProjectionSpecification
}

const props = withDefaults(defineProps<MapProps & Partial<Omit<MapOptions, 'container' | 'style'>>>(), {
  center: () => [0, 0] as [number, number],
  zoom: 2
})

const defaultStyles = {
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
}

const containerRef = ref<HTMLDivElement | null>(null)
const mapInstance = ref<MapLibreGL.Map | null>(null)
const isLoaded = ref(false)
const isStyleLoaded = ref(false)
const isDark = useDark()

const mapStyles = computed(() => ({
  dark: props.styles?.dark ?? defaultStyles.dark,
  light: props.styles?.light ?? defaultStyles.light
}))

const isLoading = computed(() => !isLoaded.value || !isStyleLoaded.value)

let styleTimeout: ReturnType<typeof setTimeout> | null = null

const clearStyleTimeout = () => {
  if (styleTimeout) {
    clearTimeout(styleTimeout)
    styleTimeout = null
  }
}

// Provide map instance and loaded state to children
provide('map', mapInstance)
provide('isMapLoaded', computed(() => isLoaded.value && isStyleLoaded.value))

defineExpose({
  map: mapInstance
})

onMounted(() => {
  if (!containerRef.value) return

  const initialStyle = isDark.value ? mapStyles.value.dark : mapStyles.value.light
  let currentStyle = initialStyle

  const map = new MapLibreGL.Map({
    container: containerRef.value,
    style: initialStyle,
    center: props.center as [number, number],
    zoom: props.zoom as number,
    renderWorldCopies: false,
    attributionControl: {
      compact: true
    }
  })

  const styleDataHandler = () => {
    clearStyleTimeout()
    styleTimeout = setTimeout(() => {
      isStyleLoaded.value = true
      if (props.projection) {
        map.setProjection(props.projection)
      }
    }, 150)
  }

  const loadHandler = () => {
    isLoaded.value = true
  }

  map.on('load', loadHandler)
  map.on('styledata', styleDataHandler)
  mapInstance.value = map

  // Watch for theme changes
  watch(isDark, (newIsDark) => {
    if (!map) return

    const newStyle = newIsDark ? mapStyles.value.dark : mapStyles.value.light

    if (currentStyle === newStyle) return

    clearStyleTimeout()
    currentStyle = newStyle
    isStyleLoaded.value = false

    map.setStyle(newStyle, { diff: true })
  })
})

onUnmounted(() => {
  clearStyleTimeout()
  if (mapInstance.value) {
    mapInstance.value.remove()
  }
  isLoaded.value = false
  isStyleLoaded.value = false
  mapInstance.value = null
})
</script>

<template>
  <div ref="containerRef" class="relative w-full h-full">
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
      <div class="flex gap-1">
        <span class="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse" />
        <span class="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" />
        <span class="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" />
      </div>
    </div>
    <template v-if="mapInstance">
      <slot />
    </template>
  </div>
</template>
