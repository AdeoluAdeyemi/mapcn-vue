<script setup lang="ts">
import { ref } from 'vue'
import { Map, MapMarker, MarkerContent, MarkerTooltip } from '@/components/map'
import type MapLibreGL from 'maplibre-gl'
import { Navigation } from 'lucide-vue-next'
import ExampleCard from '@/components/ExampleCard.vue'

const destination = {
  name: 'New York',
  description: 'United States',
  center: [-74.006, 40.7128] as [number, number],
  startCenter: [10, 50] as [number, number],
}

const mapRef = ref<MapLibreGL.Map | null>(null)

const handleFlyTo = () => {
  if (mapRef.value) {
    mapRef.value.flyTo({
      center: destination.center,
      zoom: 14,
      duration: 2500,
    })
  }
}

const onMapLoad = (map: MapLibreGL.Map) => {
  mapRef.value = map
}
</script>

<template>
  <ExampleCard label="Fly To" class="aspect-square" delay="delay-600">
    <Map
      :center="destination.startCenter"
      :zoom="0.5"
      :projection="{ type: 'globe' }"
      @load="onMapLoad"
    >
      <MapMarker
        :longitude="destination.center[0]"
        :latitude="destination.center[1]"
      >
        <MarkerContent>
          <div class="relative flex items-center justify-center">
            <div class="absolute size-6 rounded-full bg-cyan-500/20 animate-ping" />
            <div class="size-4 rounded-full bg-cyan-500 border-2 border-white shadow-lg" />
          </div>
        </MarkerContent>
        <MarkerTooltip>
          <div class="text-center">
            <div class="font-medium">{{ destination.name }}</div>
            <div class="text-[10px] text-muted-foreground">
              {{ destination.description }}
            </div>
          </div>
        </MarkerTooltip>
      </MapMarker>
    </Map>
    
    <button
      class="absolute top-2 right-2 inline-flex items-center justify-center size-8 rounded-md bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      @click="handleFlyTo"
    >
      <Navigation class="size-4" />
    </button>
  </ExampleCard>
</template>
