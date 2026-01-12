<script setup lang="ts">
import { Map, MapClusterLayer, MapControls } from '@/components/map'
import DocsSidebar from '@/components/DocsSidebar.vue'
import DocsToc from '@/components/DocsToc.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import { Card } from '@/components/ui/card'
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs'

const tocSections = [
  { id: 'basic-example', title: 'Basic Example' }
]

const geojsonData: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: Array.from({ length: 100 }, (_, i) => ({
    type: 'Feature',
    properties: { id: i },
    geometry: {
      type: 'Point',
      coordinates: [
        -180 + Math.random() * 360,
        -85 + Math.random() * 170
      ]
    }
  }))
} as GeoJSON.FeatureCollection

const codeExample = `<script setup lang="ts">
import { Map, MapClusterLayer, MapControls } from '@/components/map'

const geojsonData: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: Array.from({ length: 100 }, (_, i) => ({
    type: 'Feature',
    properties: { id: i },
    geometry: {
      type: 'Point',
      coordinates: [
        -180 + Math.random() * 360,
        -85 + Math.random() * 170
      ]
    }
  }))
} as GeoJSON.FeatureCollection
<\/script>

<template>
  <Map :center="[0, 20]" :zoom="2">
    <MapClusterLayer :data="geojsonData" />
    <MapControls show-zoom />
  </Map>
</template>`
</script>

<template>
  <div class="flex">
    <DocsSidebar />
    <div class="container py-12 flex-1">
      <div class="mx-auto max-w-5xl">
        <div class="space-y-2">
          <h1 class="text-3xl font-semibold tracking-tight text-foreground">Clusters</h1>
          <p class="text-base text-muted-foreground leading-relaxed">Cluster large numbers of markers for better performance and cleaner maps.</p>
        </div>
        
        <div class="mt-10 space-y-10">
          <section class="space-y-4 scroll-mt-20">
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>The <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">MapClusterLayer</code> component uses MapLibre's built-in clustering to efficiently render large numbers of points. Points are automatically grouped into clusters at low zoom levels, and expand as you zoom in.</p>
            </div>
          </section>

          <section class="space-y-4 scroll-mt-20" id="basic-example">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Basic Example</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>Click on clusters to zoom in. Click individual points to see details in a popup.</p>
            </div>

        <Card>
          <Tabs default-value="preview">
            <TabsList class="w-full justify-start border-b rounded-none">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" class="mt-0">
              <div class="relative h-[500px] w-full overflow-hidden">
                <Map :center="[0, 20]" :zoom="2">
                  <MapClusterLayer :data="geojsonData" />
                  <MapControls show-zoom />
                </Map>
              </div>
            </TabsContent>
            
            <TabsContent value="code" class="mt-0">
              <CodeBlock :code="codeExample" lang="vue" />
            </TabsContent>
          </Tabs>
        </Card>
          </section>
        </div>

        <div class="flex items-center justify-between gap-4 mt-14 pt-8 border-t">
          <router-link to="/docs/controls" class="group flex flex-col items-start gap-1.5">
            <span class="text-xs text-muted-foreground">Previous</span>
            <span class="text-sm font-medium group-hover:underline underline-offset-4">Controls</span>
          </router-link>
          <router-link to="/docs/advanced-usage" class="group flex flex-col items-end gap-1.5">
            <span class="text-xs text-muted-foreground">Next</span>
            <span class="text-sm font-medium group-hover:underline underline-offset-4">Advanced Usage</span>
          </router-link>
        </div>
      </div>
    </div>
    <DocsToc :sections="tocSections" />
  </div>
</template>
