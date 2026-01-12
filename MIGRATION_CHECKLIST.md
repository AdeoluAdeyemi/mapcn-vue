# Migration Checklist

Use this checklist to track your migration from the React/Next.js version to Vue 3.

## Pre-Migration

- [ ] Back up your current project
- [ ] Review [CONVERSION_SUMMARY.md](./CONVERSION_SUMMARY.md)
- [ ] Check Node.js version (18+ required)
- [ ] Ensure git working directory is clean

## Installation

- [ ] Run `npm install` or `./setup.sh`
- [ ] Verify all dependencies installed correctly
- [ ] Check for any peer dependency warnings

## Core Components Converted

### Map Components
- [x] Map.vue (main map component)
- [x] MapMarker.vue (marker component)
- [x] MarkerContent.vue (marker visual content)
- [x] MarkerPopup.vue (popup attached to marker)
- [x] MarkerTooltip.vue (tooltip on hover)
- [x] MarkerLabel.vue (marker label)
- [x] MapPopup.vue (standalone popup)
- [x] MapControls.vue (zoom, compass, etc.)
- [x] MapRoute.vue (draw routes)
- [x] MapClusterLayer.vue (cluster markers)

### UI Components
- [x] Header.vue
- [x] Footer.vue
- [x] ThemeToggle.vue

### Pages
- [x] Home.vue
- [x] Docs.vue
- [x] Installation.vue
- [x] BasicMap.vue
- [x] Markers.vue
- [x] Popups.vue
- [x] Routes.vue
- [x] Controls.vue
- [x] Clusters.vue
- [x] AdvancedUsage.vue
- [x] ApiReference.vue

### Composables
- [x] useDark.ts
- [x] useMobile.ts

## Configuration Files

- [x] vite.config.ts created
- [x] tsconfig.json updated for Vue
- [x] tsconfig.node.json created
- [x] package.json updated with Vue dependencies
- [x] index.html created
- [x] src/main.ts created (app entry)
- [x] src/App.vue created (root component)
- [x] src/env.d.ts created (type declarations)

## Testing

- [ ] Run development server: `npm run dev`
- [ ] Test home page loads
- [ ] Test navigation between pages
- [ ] Test basic map rendering
- [ ] Test markers display correctly
- [ ] Test marker interactions (click, drag)
- [ ] Test popups open/close
- [ ] Test tooltips on hover
- [ ] Test route rendering
- [ ] Test map controls (zoom, compass, locate, fullscreen)
- [ ] Test cluster layer
- [ ] Test theme switching (light/dark)
- [ ] Test responsive design
- [ ] Build for production: `npm run build`
- [ ] Preview production build: `npm run preview`

## Cleanup (Optional)

- [ ] Remove `src/app/` directory (Next.js)
- [ ] Remove `next.config.ts`
- [ ] Remove `next-env.d.ts`
- [ ] Remove `src/registry/map.tsx` (React version)
- [ ] Remove React-specific components in `src/components/`
- [ ] Remove `.next/` build directory
- [ ] Update `.gitignore` to remove Next.js entries
- [ ] Remove old React dependencies from `node_modules`

## Documentation

- [x] README.md updated
- [x] SETUP.md created
- [x] CONVERSION_SUMMARY.md created
- [x] QUICK_START.md created
- [x] setup.sh script created

## Deployment

- [ ] Update deployment configuration (if needed)
- [ ] Test build process
- [ ] Deploy to staging/preview environment
- [ ] Test deployed version
- [ ] Deploy to production

## Post-Migration

- [ ] Update documentation links
- [ ] Update package.json metadata
- [ ] Tag new version in git
- [ ] Notify team/users of new Vue version
- [ ] Archive old React version (if needed)

## Common Issues

### Map not rendering
- Check container has height: `class="h-screen"` or `style="height: 500px"`
- Verify MapLibre GL CSS is loaded
- Check browser console for errors

### Theme not switching
- Ensure `@vueuse/core` is installed
- Check `useDark()` is imported correctly
- Verify no CSS conflicts

### TypeScript errors
- Run `npm run build` to see all errors
- Check imports are using `.vue` extension where needed
- Verify all types are properly imported

### Routing issues
- Check RouterLink components use correct `to` prop
- Verify routes are defined in `src/main.ts`
- Test with Vue DevTools

### Performance issues
- Use MapClusterLayer for large datasets
- Implement virtual scrolling for long lists
- Check for memory leaks in map instances

## Need Help?

- Check [QUICK_START.md](./QUICK_START.md) for examples
- Review [CONVERSION_SUMMARY.md](./CONVERSION_SUMMARY.md) for API changes
- See [Vue 3 Documentation](https://vuejs.org/)
- See [MapLibre GL Documentation](https://maplibre.org/)

---

**Last Updated**: January 2026
