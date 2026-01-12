<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    @click="toggleDark()"
    class="flex items-center justify-center size-8 rounded-md hover:bg-accent transition-colors"
    aria-label="Toggle theme"
  >
    <Sun v-if="isDark" class="size-4" />
    <Moon v-else class="size-4" />
  </button>
</template>
