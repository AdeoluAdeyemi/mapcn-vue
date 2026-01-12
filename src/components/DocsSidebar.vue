<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { 
  Map,
  BookOpen,
  Code,
  Braces,
  MapPin,
  MessageSquare,
  Route,
  Wrench,
  Settings,
  Layers,
} from 'lucide-vue-next'

const route = useRoute()

const docsNavigation = [
  {
    title: 'Basics',
    items: [
      { title: 'Getting Started', href: '/docs/getting-started', icon: BookOpen },
      { title: 'Installation', href: '/docs/installation', icon: Code },
      { title: 'API Reference', href: '/docs/api-reference', icon: Braces },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Map', href: '/docs/basic-map', icon: Map },
      { title: 'Controls', href: '/docs/controls', icon: Settings },
      { title: 'Markers', href: '/docs/markers', icon: MapPin },
      { title: 'Popups', href: '/docs/popups', icon: MessageSquare },
      { title: 'Routes', href: '/docs/routes', icon: Route },
      { title: 'Clusters', href: '/docs/clusters', icon: Layers },
      { title: 'Advanced', href: '/docs/advanced-usage', icon: Wrench },
    ],
  },
]

const isActive = (href: string) => computed(() => route.path === href)
</script>

<template>
  <aside class="hidden md:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-r border-border/40 overflow-y-auto">
    <nav class="py-8 px-4 space-y-8">
      <div v-for="group in docsNavigation" :key="group.title" class="space-y-3">
        <h4 class="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70 px-2">
          {{ group.title }}
        </h4>
        <ul class="space-y-1">
          <li v-for="item in group.items" :key="item.href">
            <RouterLink
              :to="item.href"
              :class="[
                'flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors',
                isActive(item.href).value
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              ]"
            >
              <component :is="item.icon" class="size-4" />
              <span>{{ item.title }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>
