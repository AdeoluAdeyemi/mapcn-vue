<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Search, BookOpen, Code, Braces, Map, Settings, MapPin, MessageSquare, Route, Layers, Wrench } from 'lucide-vue-next'

const open = ref(false)
const router = useRouter()

const basics = [
  { title: 'Getting Started', path: '/docs', icon: BookOpen },
  { title: 'Installation', path: '/docs/installation', icon: Code },
  { title: 'API Reference', path: '/docs/api-reference', icon: Braces },
]

const components = [
  { title: 'Map', path: '/docs/basic-map', icon: Map },
  { title: 'Controls', path: '/docs/controls', icon: Settings },
  { title: 'Markers', path: '/docs/markers', icon: MapPin },
  { title: 'Popups', path: '/docs/popups', icon: MessageSquare },
  { title: 'Routes', path: '/docs/routes', icon: Route },
  { title: 'Clusters', path: '/docs/clusters', icon: Layers },
  { title: 'Advanced', path: '/docs/advanced-usage', icon: Wrench },
]

const handleSelect = (path: string) => {
  open.value = false
  router.push(path)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    open.value = !open.value
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div>
    <button
      @click="open = true"
      class="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent transition-colors text-sm text-muted-foreground"
    >
      <Search class="size-4" />
      <span class="hidden sm:inline">Search</span>
      <kbd class="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
        <span class="text-xs">⌘</span>K
      </kbd>
    </button>

    <Dialog v-model:open="open">
      <DialogContent class="p-0 overflow-hidden">
        <Command>
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            <CommandGroup heading="Basics">
              <CommandItem
                v-for="item in basics"
                :key="item.path"
                :value="item.title"
                @select="handleSelect(item.path)"
              >
                <component :is="item.icon" class="mr-2" />
                <span>{{ item.title }}</span>
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Components">
              <CommandItem
                v-for="item in components"
                :key="item.path"
                :value="item.title"
                @select="handleSelect(item.path)"
              >
                <component :is="item.icon" class="mr-2" />
                <span>{{ item.title }}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  </div>
</template>
