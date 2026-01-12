<script setup lang="ts">
import { Map, MapRoute, MapMarker, MarkerContent } from '@/components/map'
import { Bike, Flame, Clock, Route } from 'lucide-vue-next'
import ExampleCard from '@/components/ExampleCard.vue'

// Central Park cycling route
const trailCoordinates: [number, number][] = [
  [-73.95846730810143, 40.80035246904919],
  [-73.9717593682683, 40.78210942124929],
  [-73.98192123136191, 40.76793032580281],
  [-73.97393759456651, 40.76462909128966],
  [-73.97291537521572, 40.765159628993814],
  [-73.96920618484948, 40.7637106622374],
  [-73.96383691302509, 40.77117117897504],
  [-73.9584024523858, 40.76889223221369],
  [-73.9470773638119, 40.784238113060894],
  [-73.95585246901248, 40.78786547226602],
  [-73.94937945594087, 40.79668351998197],
  [-73.9498273526222, 40.797167598041455],
  [-73.95699644240298, 40.80016017872583],
]

const start = trailCoordinates[0]
const end = trailCoordinates[trailCoordinates.length - 1]
</script>

<template>
  <ExampleCard label="" class="aspect-square" delay="delay-500">
    <div class="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-md rounded-lg p-3 border border-border/50 shadow-lg">
      <div class="flex items-center gap-1.5 mb-2">
        <Bike class="size-3.5 text-emerald-500" />
        <span class="text-xs font-medium">Central Park Loop</span>
      </div>
      <div class="grid grid-cols-3 gap-3 text-center">
        <div>
          <div class="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
            <Route class="size-3" />
          </div>
          <div class="text-sm font-semibold">6.2</div>
          <div class="text-[9px] text-muted-foreground uppercase">Miles</div>
        </div>
        <div>
          <div class="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
            <Clock class="size-3" />
          </div>
          <div class="text-sm font-semibold">32</div>
          <div class="text-[9px] text-muted-foreground uppercase">Mins</div>
        </div>
        <div>
          <div class="flex items-center justify-center gap-1 text-muted-foreground mb-0.5">
            <Flame class="size-3" />
          </div>
          <div class="text-sm font-semibold">285</div>
          <div class="text-[9px] text-muted-foreground uppercase">Cal</div>
        </div>
      </div>
    </div>

    <Map :center="[-73.97, 40.782]" :zoom="11.8">
      <MapRoute
        :coordinates="trailCoordinates"
        color="#10b981"
        :width="3"
        :opacity="0.9"
      />
      
      <MapMarker :longitude="start[0]" :latitude="start[1]">
        <MarkerContent>
          <div class="size-3 rounded-full bg-emerald-500 border-2 border-white shadow-lg" />
        </MarkerContent>
      </MapMarker>

      <MapMarker :longitude="end[0]" :latitude="end[1]">
        <MarkerContent>
          <div class="size-3 rounded-full bg-red-500 border-2 border-white shadow-lg" />
        </MarkerContent>
      </MapMarker>
    </Map>
  </ExampleCard>
</template>
