# mapcn-vue

**Beautiful maps, made simple.**

Free & open source map components for Vue 3. Zero config, one command setup.  
Built on [MapLibre GL](https://maplibre.org/), styled with [Tailwind](https://tailwindcss.com/).

---

## Features

- 🎨 **Theme-aware** — Automatically adapts to light/dark mode
- 🎯 **Zero config** — Works out of the box with sensible defaults
- 🧩 **Composable** — Build complex map UIs with simple, declarative components
- 🗺️ **MapLibre GL powered** — Full access to MapLibre's powerful mapping capabilities
- 📍 **Markers & Popups** — Rich marker system with popups, tooltips, and labels
- 🛤️ **Routes** — Draw routes and paths on your maps
- 🎮 **Controls** — Zoom, compass, locate, and fullscreen controls

## Installation

```bash
npm install maplibre-gl @vueuse/core
```

Copy the map components from `src/components/map` into your project.

## Quick Start

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

## Basemap Terms of Service

This project uses [CARTO Basemaps](https://docs.carto.com/faqs/carto-basemaps) which are based on OpenStreetMap data.

- **Commercial use**: Requires a CARTO Enterprise license. [Request a demo](https://carto.com/request-live-demo) for pricing details.
- **Non-commercial use**: Free for CARTO grantees under their [basemap terms](https://carto.com/legal/bmap).
- **Alternative**: You can switch to [OpenStreetMap](https://www.openstreetmap.org/) tiles or any other MapLibre-compatible tile provider.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Credits

This is a Vue 3 port of the original [mapcn](https://github.com/AnmolSaini16/mapcn) library by [Anmol Saini](https://github.com/AnmolSaini16).


MIT License - see the [LICENSE](LICENSE) file for details.
