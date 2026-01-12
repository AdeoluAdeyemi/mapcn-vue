<script setup lang="ts">
import { inject, type Ref } from 'vue'
import MapLibreGL from 'maplibre-gl'
import { cn } from '@/lib/utils'

interface MarkerContentProps {
  className?: string
}

defineProps<MarkerContentProps>()

const marker = inject<Ref<MapLibreGL.Marker | null>>('marker')
</script>

<template>
  <Teleport v-if="marker" :to="marker.getElement()">
    <div :class="cn('relative cursor-pointer', className)">
      <slot>
        <!-- Default marker icon with pulse animation -->
        <div class="relative flex items-center justify-center">
          <div class="absolute rounded-full bg-emerald-500/20" style="width: 22.5px; height: 22.5px;" />
          <div class="absolute rounded-full bg-emerald-500/40 animate-ping" style="width: 13.5px; height: 13.5px; animation-duration: 2s;" />
          <div class="relative rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" style="width: 9px; height: 9px;" />
        </div>
      </slot>
    </div>
  </Teleport>
</template>
