<script setup lang="ts">
import {
  AnalyticsExample,
  TrailExample,
  FlyToExample,
  EVChargingExample,
  TrendingExample,
  DeliveryExample
} from '@/components/examples'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 py-12 md:py-24 lg:py-32">
      <div class="container px-4 md:px-6">
        <div class="flex flex-col items-center space-y-4 text-center">
          <div class="space-y-2">
            <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Beautiful maps, made simple
            </h1>
            <p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Free & open source map components. Zero config, one command setup.
            </p>
            <p class="mx-auto max-w-[700px] text-muted-foreground">
              Built on MapLibre GL, styled with Tailwind, works seamlessly with shadcn/ui.
            </p>
          </div>
          <div class="space-x-4">
            <RouterLink
              to="/docs"
              class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Get Started
            </RouterLink>
            <a
              href="https://github.com/AnmolSaini16/mapcn"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              GitHub
            </a>
          </div>
        </div>

        <!-- Example Maps Grid -->
        <div class="mx-auto mt-12 max-w-7xl">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-fade-in delay-400">
            <AnalyticsExample />
            <TrailExample />
            <FlyToExample />
            <EVChargingExample />
            <TrendingExample />
            <DeliveryExample />
          </div>
        </div>

        <!-- Features -->
        <div class="mx-auto mt-24 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div class="flex flex-col items-center space-y-2 text-center">
            <div class="rounded-lg bg-primary/10 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">Theme-aware</h3>
            <p class="text-sm text-muted-foreground">
              Automatically adapts to light/dark mode
            </p>
          </div>
          <div class="flex flex-col items-center space-y-2 text-center">
            <div class="rounded-lg bg-primary/10 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">Zero config</h3>
            <p class="text-sm text-muted-foreground">
              Works out of the box with sensible defaults
            </p>
          </div>
          <div class="flex flex-col items-center space-y-2 text-center">
            <div class="rounded-lg bg-primary/10 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">Composable</h3>
            <p class="text-sm text-muted-foreground">
              Build complex map UIs with simple components
            </p>
          </div>
          <div class="flex flex-col items-center space-y-2 text-center">
            <div class="rounded-lg bg-primary/10 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold">Full-featured</h3>
            <p class="text-sm text-muted-foreground">
              Markers, popups, routes, clusters & more
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
