# React vs Vue 3 Code Comparison

Side-by-side comparison of the same features in React (original) and Vue 3 (converted).

## Basic Map Component

### React (Original)
```tsx
"use client";
import { useState, useRef, useEffect } from "react";
import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export function Map({ center, zoom, children }) {
  const containerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new MapLibreGL.Map({
      container: containerRef.current,
      center,
      zoom,
    });

    map.on('load', () => setIsLoaded(true));
    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {isLoaded && children}
    </div>
  );
}
```

### Vue 3 (Converted)
```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide, computed } from 'vue'
import MapLibreGL from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const props = defineProps<{
  center: [number, number]
  zoom: number
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const mapInstance = ref<MapLibreGL.Map | null>(null)
const isLoaded = ref(false)

provide('map', mapInstance)
provide('isMapLoaded', computed(() => isLoaded.value))

onMounted(() => {
  if (!containerRef.value) return

  const map = new MapLibreGL.Map({
    container: containerRef.value,
    center: props.center,
    zoom: props.zoom
  })

  map.on('load', () => {
    isLoaded.value = true
  })
  
  mapInstance.value = map
})

onUnmounted(() => {
  if (mapInstance.value) {
    mapInstance.value.remove()
  }
})
</script>

<template>
  <div ref="containerRef" class="relative w-full h-full">
    <template v-if="isLoaded">
      <slot />
    </template>
  </div>
</template>
```

## Marker Component

### React (Original)
```tsx
import { useContext, useMemo, useEffect } from "react";
import MapLibreGL from "maplibre-gl";

export function MapMarker({ 
  longitude, 
  latitude, 
  children,
  onClick 
}) {
  const { map } = useMap();

  const marker = useMemo(() => {
    const element = document.createElement("div");
    const markerInstance = new MapLibreGL.Marker({ element })
      .setLngLat([longitude, latitude]);

    element.addEventListener("click", onClick);

    return markerInstance;
  }, []);

  useEffect(() => {
    if (!map) return;
    marker.addTo(map);
    return () => marker.remove();
  }, [map]);

  useEffect(() => {
    marker.setLngLat([longitude, latitude]);
  }, [longitude, latitude]);

  return <MarkerContext.Provider value={{ marker }}>
    {children}
  </MarkerContext.Provider>;
}
```

### Vue 3 (Converted)
```vue
<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted, watch, provide } from 'vue'
import MapLibreGL from 'maplibre-gl'

const props = defineProps<{
  longitude: number
  latitude: number
}>()

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()

const map = inject<Ref<MapLibreGL.Map | null>>('map')
const marker = ref<MapLibreGL.Marker | null>(null)

provide('marker', marker)

onMounted(() => {
  if (!map?.value) return

  const element = document.createElement('div')
  const markerInstance = new MapLibreGL.Marker({ element })
    .setLngLat([props.longitude, props.latitude])

  element.addEventListener('click', (e) => emit('click', e))
  
  markerInstance.addTo(map.value)
  marker.value = markerInstance
})

watch(() => [props.longitude, props.latitude], ([lng, lat]) => {
  if (marker.value) {
    marker.value.setLngLat([lng as number, lat as number])
  }
})

onUnmounted(() => {
  if (marker.value) {
    marker.value.remove()
  }
})
</script>

<template>
  <slot />
</template>
```

## State Management

### React (Original)
```tsx
function MyComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button onClick={handleClick}>
      Count: {count}
    </button>
  );
}
```

### Vue 3 (Converted)
```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const items = ref([])

const handleClick = () => {
  count.value++
}
</script>

<template>
  <button @click="handleClick">
    Count: {{ count }}
  </button>
</template>
```

## Computed Values

### React (Original)
```tsx
function MyComponent() {
  const [count, setCount] = useState(0);
  const doubled = useMemo(() => count * 2, [count]);

  return <div>Doubled: {doubled}</div>;
}
```

### Vue 3 (Converted)
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <div>Doubled: {{ doubled }}</div>
</template>
```

## Effects/Watchers

### React (Original)
```tsx
function MyComponent() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Runs when searchQuery changes
    console.log('Searching for:', searchQuery);
  }, [searchQuery]);

  return <input 
    value={searchQuery}
    onChange={e => setSearchQuery(e.target.value)}
  />;
}
```

### Vue 3 (Converted)
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const searchQuery = ref('')

watch(searchQuery, (newValue) => {
  // Runs when searchQuery changes
  console.log('Searching for:', newValue)
})
</script>

<template>
  <input v-model="searchQuery" />
</template>
```

## Conditional Rendering

### React (Original)
```tsx
function MyComponent({ isVisible, items }) {
  return (
    <div>
      {isVisible && <p>Visible content</p>}
      
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No items</p>
      )}
    </div>
  );
}
```

### Vue 3 (Converted)
```vue
<script setup lang="ts">
defineProps<{
  isVisible: boolean
  items: Array<{ id: number; name: string }>
}>()
</script>

<template>
  <div>
    <p v-if="isVisible">Visible content</p>
    
    <ul v-if="items.length > 0">
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <p v-else>No items</p>
  </div>
</template>
```

## Event Handling

### React (Original)
```tsx
function MyComponent() {
  const handleClick = (e) => {
    console.log('Clicked!', e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={handleClick}>Click me</button>
    </form>
  );
}
```

### Vue 3 (Converted)
```vue
<script setup lang="ts">
const handleClick = (e: MouseEvent) => {
  console.log('Clicked!', e)
}

const handleSubmit = (e: Event) => {
  e.preventDefault()
  console.log('Submitted!')
}
</script>

<template>
  <form @submit="handleSubmit">
    <button @click="handleClick">Click me</button>
  </form>
</template>
```

## Context/Provide-Inject

### React (Original)
```tsx
// Provider
const MapContext = createContext(null);

function Map({ children }) {
  const [map, setMap] = useState(null);
  
  return (
    <MapContext.Provider value={{ map }}>
      {children}
    </MapContext.Provider>
  );
}

// Consumer
function MapMarker() {
  const { map } = useContext(MapContext);
  return <div>Map: {map}</div>;
}
```

### Vue 3 (Converted)
```vue
<!-- Provider -->
<script setup lang="ts">
import { ref, provide } from 'vue'

const map = ref(null)
provide('map', map)
</script>

<template>
  <slot />
</template>

<!-- Consumer -->
<script setup lang="ts">
import { inject } from 'vue'

const map = inject('map')
</script>

<template>
  <div>Map: {{ map }}</div>
</template>
```

## Portals/Teleport

### React (Original)
```tsx
import { createPortal } from "react-dom";

function MyComponent() {
  const container = document.getElementById('portal-root');
  
  return createPortal(
    <div>Portal content</div>,
    container
  );
}
```

### Vue 3 (Converted)
```vue
<template>
  <Teleport to="#portal-root">
    <div>Portal content</div>
  </Teleport>
</template>
```

## Refs/Template Refs

### React (Original)
```tsx
function MyComponent() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
```

### Vue 3 (Converted)
```vue
<script setup lang="ts">
import { ref } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)

const focusInput = () => {
  inputRef.value?.focus()
}
</script>

<template>
  <input ref="inputRef" />
  <button @click="focusInput">Focus</button>
</template>
```

## Key Differences Summary

| Feature | React | Vue 3 |
|---------|-------|-------|
| State | `useState()` | `ref()` |
| Computed | `useMemo()` | `computed()` |
| Effects | `useEffect()` | `watch()` / `watchEffect()` |
| Context | `createContext()` | `provide()` / `inject()` |
| Refs | `useRef()` | `ref()` (same name, different use) |
| Portals | `createPortal()` | `<Teleport>` |
| Props | Function parameters | `defineProps<T>()` |
| Events | `on*` props | `@*` directives |
| Conditional | `{condition && <Component />}` | `v-if` |
| Lists | `.map()` | `v-for` |
| Two-way binding | Manual state + onChange | `v-model` |
| Lifecycle | `useEffect()` | `onMounted()`, `onUnmounted()`, etc. |

## Bundle Size Comparison

**React + Next.js (original)**:
- Min bundle: ~80-100 KB (React runtime)
- With dependencies: ~150-200 KB

**Vue 3 + Vite (converted)**:
- Min bundle: ~40-50 KB (Vue runtime)
- With dependencies: ~80-120 KB

**~40-50% smaller bundle size with Vue 3!**
