# mapcn-vue Installation Guide

## Quick Install (Coming Soon)

Once hosted at hostvision.cloud, you'll be able to install with:

```bash
npx shadcn-vue@latest add https://hostvision.cloud/registry/map.json
```

## Manual Installation (Current Method)

### Prerequisites

```bash
npm install maplibre-gl @vueuse/core lucide-vue-next
```

### Step 1: Copy Components

Copy all files from `src/components/map/` to your project's `src/components/map/` directory:

- Map.vue
- MapMarker.vue
- MarkerContent.vue
- MarkerPopup.vue
- MarkerTooltip.vue
- MarkerLabel.vue
- MapPopup.vue
- MapControls.vue
- MapRoute.vue
- MapClusterLayer.vue
- MapStatCard.vue
- index.ts

### Step 2: Add MapLibre CSS

In your main CSS file (`src/assets/css/globals.css` or similar), add:

```css
@import 'maplibre-gl/dist/maplibre-gl.css';

@layer base {
  .maplibregl-popup-content {
    @apply bg-transparent! shadow-none! p-0! rounded-none!;
  }
  .maplibregl-popup-tip {
    @apply hidden!;
  }
}
```

### Step 3: Use in Your Project

```vue
<script setup lang="ts">
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/map'
</script>

<template>
  <div class="h-screen">
    <Map :center="[0, 0]" :zoom="2">
      <MapMarker :longitude="0" :latitude="0">
        <MarkerContent />
      </MapMarker>
      <MapControls show-zoom />
    </Map>
  </div>
</template>
```

## Setting Up Registry for shadcn-vue

To enable the `npx shadcn-vue add` command, you need to:

1. **Host the registry files** on your domain (hostvision.cloud)
2. **Create registry structure** in `public/registry/`
3. **Deploy** to make files accessible

### Registry File Structure

```
public/
  registry/
    index.json          # Main registry file
    map.json           # Map component registry
    map/              # Individual component files
      Map.vue
      MapMarker.vue
      ... (all other components)
```

### Example registry/index.json

```json
{
  "$schema": "https://shadcn-vue.com/schema.json",
  "name": "mapcn-vue",
  "url": "https://hostvision.cloud/registry",
  "components": [
    {
      "name": "map",
      "dependencies": ["maplibre-gl", "@vueuse/core", "lucide-vue-next"],
      "files": [
        "map/Map.vue",
        "map/MapMarker.vue",
        "map/MarkerContent.vue",
        "map/MarkerPopup.vue",
        "map/MarkerTooltip.vue",
        "map/MarkerLabel.vue",
        "map/MapPopup.vue",
        "map/MapControls.vue",
        "map/MapRoute.vue",
        "map/MapClusterLayer.vue",
        "map/MapStatCard.vue",
        "map/index.ts"
      ]
    }
  ]
}
```

### Deployment Steps

1. Build your Vue project: `npm run build`
2. Deploy `dist/` folder to hostvision.cloud
3. Ensure registry files are accessible at: `https://hostvision.cloud/registry/*`
4. Test installation: `npx shadcn-vue@latest add https://hostvision.cloud/registry/map.json`

## Components Overview

- **Map** - Main map container with theme support
- **MapMarker** - Interactive markers with drag support
- **MarkerContent** - Custom marker visual content
- **MarkerPopup** - Popups attached to markers
- **MarkerTooltip** - Hover tooltips for markers
- **MarkerLabel** - Text labels for markers
- **MapPopup** - Standalone popups
- **MapControls** - Zoom, compass, locate, fullscreen controls
- **MapRoute** - Draw routes/paths on the map
- **MapClusterLayer** - Cluster large datasets
- **MapStatCard** - Overlay statistics cards

## Basemap Terms of Service

This project uses [CARTO Basemaps](https://docs.carto.com/faqs/carto-basemaps) which are based on OpenStreetMap data.
