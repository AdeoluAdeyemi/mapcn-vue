<script setup lang="ts">
import { Heart, MapPin } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle.vue'
import CommandSearch from './CommandSearch.vue'

interface HeaderProps {
  className?: string
}

defineProps<HeaderProps>()
</script>

<template>
  <header :class="cn('w-full h-16', className)">
    <nav class="flex size-full items-center justify-between container w-full h-16 sticky top-0 z-50 bg-background/95 border-b backdrop-blur supports-backdrop-filter:bg-background/60">
      <div class="flex items-center gap-4">
        <slot name="left" />
        <RouterLink
          to="/"
          class="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
        >
          <MapPin class="size-4" />
          <span class="font-semibold tracking-tight">mapcn-vue</span>
        </RouterLink>
      </div>
      <div class="flex items-center gap-2 h-4.5">
        <CommandSearch />
        <div class="w-px h-4 bg-border hidden sm:block" />
        <a
          href="https://github.com/sponsors/AdeoluAdeyemi"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent transition-colors text-sm"
        >
          <Heart class="size-4 text-pink-500" />
          <span class="hidden sm:inline">Sponsor</span>
        </a>
        <div class="w-px h-4 bg-border hidden sm:block" />
        <a
          href="https://github.com/AdeoluAdeyemi/mapcn-vue"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent transition-colors text-sm"
        >
          GitHub
        </a>
        <div class="w-px h-4 bg-border" />
        <ThemeToggle />
      </div>
    </nav>
  </header>
</template>
