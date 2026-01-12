<script setup lang="ts">
import { TrendingUp, TrendingDown } from 'lucide-vue-next'
import { computed } from 'vue'

interface MapStatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const props = withDefaults(defineProps<MapStatCardProps>(), {
  position: 'top-left',
  changeLabel: 'vs last hour'
})

const positionClass = computed(() => {
  const positions = {
    'top-left': 'top-3 left-3',
    'top-right': 'top-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'bottom-right': 'bottom-3 right-3'
  }
  return positions[props.position]
})

const isPositive = computed(() => props.change && props.change > 0)
const changeColor = computed(() => isPositive.value ? 'text-emerald-500' : 'text-red-500')
</script>

<template>
  <div 
    :class="['absolute z-10 bg-background/95 backdrop-blur-md rounded-lg p-3 border border-border/50 shadow-lg', positionClass]"
  >
    <div class="tracking-wider text-[10px] text-muted-foreground uppercase mb-1">
      {{ title }}
    </div>
    <div class="text-2xl font-semibold leading-tight">
      {{ value }}
    </div>
    <div v-if="change !== undefined" class="flex items-center gap-1 mt-1">
      <TrendingUp v-if="isPositive" :class="['size-3', changeColor]" aria-hidden="true" />
      <TrendingDown v-else :class="['size-3', changeColor]" aria-hidden="true" />
      <span :class="['text-xs', changeColor]">
        {{ isPositive ? '+' : '' }}{{ change }}%
      </span>
      <span class="text-xs text-muted-foreground">{{ changeLabel }}</span>
    </div>
  </div>
</template>
