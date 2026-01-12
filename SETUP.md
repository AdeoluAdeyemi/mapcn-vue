# Setup Instructions for mapcn-vue

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

### 1. Install dependencies
```bash
npm install
```

This will install:
- Vue 3 and Vue Router
- MapLibre GL for map rendering
- @vueuse/core for composables (theme switching, etc.)
- Tailwind CSS for styling
- Lucide Vue Next for icons
- Other utilities

### 2. Start the development server
```bash
npm run dev
```

The app will be available at http://localhost:5173

### 3. Build for production
```bash
npm run build
```

Built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── map/              # Map components (Vue 3)
│   │   ├── Map.vue
│   │   ├── MapMarker.vue
│   │   ├── MapControls.vue
│   │   ├── MapRoute.vue
│   │   └── ...
│   ├── Header.vue
│   ├── Footer.vue
│   └── ThemeToggle.vue
├── pages/                # Page components
│   ├── Home.vue
│   └── docs/
│       ├── Docs.vue
│       ├── Installation.vue
│       ├── BasicMap.vue
│       └── ...
├── lib/                  # Utilities
│   └── utils.ts
├── composables/          # Vue composables
│   ├── useDark.ts
│   └── useMobile.ts
├── App.vue              # Root component
└── main.ts              # App entry point
```

## Key Differences from React/Next.js Version

1. **Component Syntax**: Vue 3 Composition API with `<script setup>` instead of React JSX
2. **State Management**: Vue's `ref()` and `reactive()` instead of `useState()`
3. **Effects**: Vue's `watch()` and `watchEffect()` instead of `useEffect()`
4. **Routing**: Vue Router instead of Next.js routing
5. **Build Tool**: Vite instead of Next.js/webpack
6. **Theme Management**: @vueuse/core's `useDark()` instead of next-themes

## Available Components

- **Map** - Main map component
- **MapMarker** - Marker component with custom content
- **MarkerContent** - Custom marker appearance
- **MarkerPopup** - Popup attached to marker
- **MarkerTooltip** - Tooltip on hover
- **MarkerLabel** - Label for marker
- **MapPopup** - Standalone popup
- **MapControls** - Zoom, compass, locate, fullscreen controls
- **MapRoute** - Draw routes/paths
- **MapClusterLayer** - Cluster markers for performance

## Troubleshooting

### Map not rendering
- Check that MapLibre GL CSS is imported in the Map component
- Ensure the map container has a defined height

### TypeScript errors
- Run `npm run build` to check for type errors
- Make sure all map props match the expected types

### Theme not switching
- Ensure @vueuse/core is installed
- Check that the useDark composable is properly imported

## Next Steps

1. Customize the map styles (light/dark themes)
2. Add your own markers and routes
3. Integrate with your backend API
4. Deploy to production (Netlify, Vercel, etc.)
