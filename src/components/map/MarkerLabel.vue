<script setup lang="ts">
import { cn } from '@/lib/utils'

interface MarkerLabelProps {
  className?: string
  position?: 'top' | 'bottom'
}

withDefaults(defineProps<MarkerLabelProps>(), {
  position: 'top'
})

const positionClasses = {
  top: 'bottom-full mb-1',
  bottom: 'top-full mt-1'
}
</script>

<template>
  <div
    :class="cn(
      'absolute left-1/2 -translate-x-1/2 whitespace-nowrap',
      'text-[10px] font-medium text-foreground',
      positionClasses[position],
      className
    )"
  >
    <slot />
  </div>
</template>
