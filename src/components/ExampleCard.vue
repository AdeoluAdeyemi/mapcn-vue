<script setup lang="ts">
import { cn } from '@/lib/utils'

interface ExampleCardProps {
  label?: string
  className?: string
  delay?: string
}

const props = withDefaults(defineProps<ExampleCardProps>(), {
  label: '',
  delay: ''
})
</script>

<template>
  <div 
    :class="cn(
      'relative overflow-hidden rounded-xl border bg-card shadow-lg transition-all hover:shadow-xl animate-fade-in',
      delay,
      className
    )"
  >
    <div v-if="label" class="absolute top-3 left-3 z-20 rounded-md bg-background/90 backdrop-blur-sm px-2 py-1 text-xs font-medium border border-border/50">
      {{ label }}
    </div>
    <slot />
  </div>
</template>
