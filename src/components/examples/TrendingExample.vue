<script setup lang="ts">
import { Map, MapMarker, MarkerContent, MarkerTooltip } from '@/components/map'
import { Flame, TrendingUp } from 'lucide-vue-next'
import ExampleCard from '@/components/ExampleCard.vue'
</script>

<template>
  <ExampleCard label="Trending" class="aspect-square" delay="delay-800">
    <Map :center="[-73.99, 40.735]" :zoom="10">
      <MapMarker :longitude="-73.9857" :latitude="40.7484">
        <MarkerContent>
          <div class="relative flex items-center justify-center">
            <div class="absolute size-18 rounded-full bg-orange-500/30 pointer-events-none" />
            <div class="absolute size-7 rounded-full bg-orange-500/40" />
            <div class="bg-gradient-to-br from-orange-500 to-red-500 rounded-full p-1.5 shadow-lg shadow-orange-500/50">
              <Flame class="size-3.5 text-white" />
            </div>
          </div>
        </MarkerContent>
        <MarkerTooltip>
          <div class="text-center">
            <div class="font-medium">Times Square</div>
            <div class="flex items-center justify-center gap-1 text-muted-foreground">
              <TrendingUp class="size-3 text-green-500" />
              <span class="text-xs text-green-500">1.8k visitors</span>
            </div>
          </div>
        </MarkerTooltip>
      </MapMarker>

      <MapMarker :longitude="-74.0445" :latitude="40.6892">
        <MarkerContent>
          <div class="relative flex items-center justify-center">
            <div class="absolute size-12 rounded-full bg-amber-500/30 pointer-events-none" />
            <div class="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full p-1 shadow-lg shadow-amber-500/50">
              <Flame class="size-2.5 text-white" />
            </div>
          </div>
        </MarkerContent>
        <MarkerTooltip>
          <div class="text-center">
            <div class="font-medium">Statue of Liberty</div>
            <div class="flex items-center justify-center gap-1 text-muted-foreground">
              <TrendingUp class="size-3 text-green-500" />
              <span class="text-xs text-green-500">1.2k visitors</span>
            </div>
          </div>
        </MarkerTooltip>
      </MapMarker>

      <MapMarker :longitude="-73.9654" :latitude="40.7829">
        <MarkerContent>
          <div class="relative flex items-center justify-center">
            <div class="absolute size-9 rounded-full bg-yellow-500/30 pointer-events-none" />
            <div class="bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full p-1 shadow-lg shadow-yellow-500/40">
              <Flame class="size-2 text-white" />
            </div>
          </div>
        </MarkerContent>
        <MarkerTooltip>
          <div class="text-center">
            <div class="font-medium">Central Park</div>
            <div class="flex items-center justify-center gap-1 text-muted-foreground">
              <TrendingUp class="size-3 text-green-500" />
              <span class="text-xs text-green-500">890 visitors</span>
            </div>
          </div>
        </MarkerTooltip>
      </MapMarker>
    </Map>
  </ExampleCard>
</template>
