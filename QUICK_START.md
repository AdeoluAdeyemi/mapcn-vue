# Quick Start Guide - Vue 3 Version

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Visit http://localhost:5173

## Basic Usage Example

```vue
<script setup lang="ts">
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/map'
</script>

<template>
  <div class="h-screen">
    <Map :center="[-0.1276, 51.5074]" :zoom="10">
      <!-- Add a marker -->
      <MapMarker :longitude="-0.1276" :latitude="51.5074">
        <MarkerContent />
      </MapMarker>
      
      <!-- Add controls -->
      <MapControls show-zoom show-compass show-locate show-fullscreen />
    </Map>
  </div>
</template>
```

## Key Conversions from React

| React Pattern | Vue 3 Pattern |
|--------------|---------------|
| `const [state, setState] = useState(false)` | `const state = ref(false)` |
| `useEffect(() => {}, [dep])` | `watch(() => dep, () => {})` |
| `onClick={handler}` | `@click="handler"` |
| `<div prop={value}>` | `<div :prop="value">` |
| `{condition && <Component />}` | `<Component v-if="condition" />` |
| `{items.map(item => ...)}` | `<div v-for="item in items">` |
| `createPortal(child, container)` | `<Teleport :to="container">` |
| `useContext(Context)` | `inject('key')` |
| `<Component />` (self-closing) | `<Component />` (same) |

## Component Props

All map components use kebab-case for multi-word props in templates:

```vue
<!-- Prop binding -->
<Map :center="[0, 0]" :zoom="2" />
<MapMarker :longitude="0" :latitude="0" :draggable="true" />
<MapControls show-zoom show-compass />
<MapRoute :coordinates="coords" :line-width="3" />
```

## Events

Events use `@` prefix:

```vue
<MapMarker 
  @click="handleClick"
  @drag-start="handleDragStart"
  @drag-end="handleDragEnd"
/>

<MapControls @locate="handleLocate" />
<MapPopup @close="handleClose" />
```

## Slots

Components can use slots for custom content:

```vue
<MapMarker :longitude="0" :latitude="0">
  <MarkerContent>
    <!-- Custom marker icon -->
    <div class="custom-icon">📍</div>
  </MarkerContent>
  
  <MarkerPopup>
    <!-- Custom popup content -->
    <h3>Location</h3>
    <p>Details here</p>
  </MarkerPopup>
</MapMarker>
```

## Accessing Map Instance

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Map } from '@/components/map'

const mapRef = ref()

function doSomething() {
  const mapInstance = mapRef.value?.map
  if (mapInstance) {
    // Access MapLibre GL map
    mapInstance.flyTo({ center: [0, 0], zoom: 5 })
  }
}
</script>

<template>
  <Map ref="mapRef" :center="[0, 0]" :zoom="2" />
</template>
```

## Theme Switching

```vue
<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()">
    Toggle Theme
  </button>
</template>
```

The Map component automatically switches between light/dark styles!

## Routing

```vue
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigate() {
  router.push('/docs')
}
</script>

<template>
  <RouterLink to="/docs">Documentation</RouterLink>
  <button @click="navigate">Go to Docs</button>
</template>
```

## Common Patterns

### Reactive State
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>
```

### Watching Changes
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const searchQuery = ref('')

watch(searchQuery, (newValue) => {
  console.log('Search:', newValue)
})
</script>
```

### Lifecycle Hooks
```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Component mounted')
})

onUnmounted(() => {
  console.log('Component unmounted')
})
</script>
```

## Build for Production

```bash
npm run build
```

Files will be in `dist/` directory.

## Deploy

The built files can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Need Help?

- [Vue 3 Documentation](https://vuejs.org/)
- [MapLibre GL Documentation](https://maplibre.org/)
- [Vite Documentation](https://vitejs.dev/)
- [VueUse Documentation](https://vueuse.org/)
