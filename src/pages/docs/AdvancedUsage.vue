<script setup lang="ts">
import { ref } from 'vue'
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/map'
import DocsSidebar from '@/components/DocsSidebar.vue'
import DocsToc from '@/components/DocsToc.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-vue-next'

const tocSections = [
  { id: 'using-a-ref', title: 'Using a Ref' },
  { id: 'custom-styles', title: 'Custom Styles' },
  { id: 'globe-projection', title: 'Globe Projection' },
  { id: 'extend-to-build', title: 'Extend to Build' }
]

// Copy state for each code section
const copiedRef = ref(false)
const copiedStyles = ref(false)
const copiedGlobe = ref(false)

const copyRefExample = async () => {
  await navigator.clipboard.writeText(refExampleCode)
  copiedRef.value = true
  setTimeout(() => {
    copiedRef.value = false
  }, 2000)
}

const copyStylesExample = async () => {
  await navigator.clipboard.writeText(customStylesCode)
  copiedStyles.value = true
  setTimeout(() => {
    copiedStyles.value = false
  }, 2000)
}

const copyGlobeExample = async () => {
  await navigator.clipboard.writeText(globeProjectionCode)
  copiedGlobe.value = true
  setTimeout(() => {
    copiedGlobe.value = false
  }, 2000)
}

// Using a Ref example
const mapRef = ref()

function handleFlyTo() {
  const map = mapRef.value?.map
  if (map) {
    map.flyTo({ center: [-74, 40.7], zoom: 12 })
  }
}

const refExampleCode = `<script setup lang="ts">
import { ref } from 'vue'
import { Map } from '@/components/map'

const mapRef = ref()

function handleFlyTo() {
  const map = mapRef.value?.map
  if (map) {
    map.flyTo({ center: [-74, 40.7], zoom: 12 })
  }
}
<\/script>

<template>
  <div class="space-y-2">
    <Button @click="handleFlyTo">Fly to NYC</Button>
    <div class="h-[400px]">
      <Map ref="mapRef" :center="[-74, 40.7]" :zoom="10">
        <MapMarker :longitude="-74" :latitude="40.7">
          <MarkerContent />
        </MapMarker>
        <MapControls show-zoom />
      </Map>
    </div>
  </div>
</template>`

const customStylesCode = `<script setup lang="ts">
import { Map } from '@/components/map'
<\/script>

<template>
  <div class="h-[400px]">
    <Map
      :center="[0, 0]"
      :zoom="2"
      :styles="{
        light: 'https://your-custom-style.json',
        dark: 'https://your-custom-dark-style.json'
      }"
    />
  </div>
</template>`

const globeProjectionCode = `<script setup lang="ts">
import { Map } from '@/components/map'
<\/script>

<template>
  <div class="h-[400px]">
    <Map
      :center="[0, 0]"
      :zoom="1"
      :projection="{ type: 'globe' }"
    />
  </div>
</template>`
</script>

<template>
  <div class="flex">
    <DocsSidebar />
    <div class="container py-12 flex-1">
      <div class="mx-auto max-w-3xl">
        <div class="space-y-2">
          <h1 class="text-3xl font-semibold tracking-tight text-foreground">Advanced Usage</h1>
          <p class="text-base text-muted-foreground leading-relaxed">Advanced techniques for customizing and extending the map component.</p>
        </div>
        
        <div class="mt-10 space-y-10">
          <section class="space-y-4 scroll-mt-20">
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>Access the underlying MapLibre GL map instance to use any feature from the MapLibre GL JS API. You can use a <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">ref</code> to access the map instance.</p>
            </div>
          </section>

          <div class="rounded-lg border bg-muted/40 px-4 py-3 text-[14px] leading-relaxed text-foreground/70 [&_strong]:text-foreground [&_strong]:font-medium">
            <strong>Tip:</strong> Check the <a target="_blank" rel="noopener noreferrer" class="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors" href="https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/">MapLibre GL JS documentation</a> for the full list of available methods and events.
          </div>

          <section class="space-y-4 scroll-mt-20" id="using-a-ref">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Using a Ref</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>The simplest way to access the map instance. Use a <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">ref</code> to call map methods from event handlers or effects.</p>
              
              <Card>
                <Tabs default-value="preview">
                  <TabsList class="w-full justify-start border-b rounded-lg relative">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <button 
                      class="absolute right-2 p-1.5 rounded hover:bg-muted transition-colors" 
                      @click="copyRefExample"
                      aria-label="Copy code"
                    >
                      <Check v-if="copiedRef" class="size-3.5 text-green-500" />
                      <Copy v-else class="size-3.5 text-muted-foreground" />
                    </button>
                  </TabsList>
                  
                  <TabsContent value="preview" class="mt-0">
                    <div class="p-4 space-y-2">
                      <Button @click="handleFlyTo">Fly to NYC</Button>
                      <div class="h-[400px] overflow-hidden rounded-lg">
                        <Map ref="mapRef" :center="[-74, 40.7]" :zoom="10">
                          <MapMarker :longitude="-74" :latitude="40.7">
                            <MarkerContent />
                          </MapMarker>
                          <MapControls show-zoom />
                        </Map>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" class="mt-0">
                    <CodeBlock :code="refExampleCode" lang="vue" />
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </section>

          <section class="space-y-4 scroll-mt-20" id="custom-styles">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Custom Styles</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>You can provide custom map styles for light and dark modes:</p>
              
              <Card>
                <Tabs default-value="preview">
                  <TabsList class="w-full justify-start border-b rounded-lg relative">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <button 
                      class="absolute right-2 p-1.5 rounded hover:bg-muted transition-colors" 
                      @click="copyStylesExample"
                      aria-label="Copy code"
                    >
                      <Check v-if="copiedStyles" class="size-3.5 text-green-500" />
                      <Copy v-else class="size-3.5 text-muted-foreground" />
                    </button>
                    <button 
                      class="absolute right-2 p-1.5 rounded hover:bg-muted transition-colors" 
                      @click="copyStylesExample"
                      aria-label="Copy code"
                    >
                      <Check v-if="copiedStyles" class="size-3.5 text-green-500" />
                      <Copy v-else class="size-3.5 text-muted-foreground" />
                    </button>
                  </TabsList>
                  
                  <TabsContent value="preview" class="mt-0">
                    <div class="relative h-[400px] w-full overflow-hidden">
                      <Map :center="[0, 0]" :zoom="2">
                        <MapControls show-zoom />
                      </Map>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" class="mt-0">
                    <CodeBlock :code="customStylesCode" lang="vue" />
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </section>

          <section class="space-y-4 scroll-mt-20" id="globe-projection">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Globe Projection</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>Enable 3D globe projection:</p>
              
              <Card>
                <Tabs default-value="preview">
                  <TabsList class="w-full justify-start border-b rounded-lg relative">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <button 
                      class="absolute right-2 p-1.5 rounded hover:bg-muted transition-colors" 
                      @click="copyGlobeExample"
                      aria-label="Copy code"
                    >
                      <Check v-if="copiedGlobe" class="size-3.5 text-green-500" />
                      <Copy v-else class="size-3.5 text-muted-foreground" />
                    </button>
                    <button 
                      class="absolute right-2 p-1.5 rounded hover:bg-muted transition-colors" 
                      @click="copyGlobeExample"
                      aria-label="Copy code"
                    >
                      <Check v-if="copiedGlobe" class="size-3.5 text-green-500" />
                      <Copy v-else class="size-3.5 text-muted-foreground" />
                    </button>
                  </TabsList>
                  
                  <TabsContent value="preview" class="mt-0">
                    <div class="relative h-[400px] w-full overflow-hidden">
                      <Map :center="[0, 0]" :zoom="1" :projection="{ type: 'globe' }">
                        <MapControls show-zoom />
                      </Map>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" class="mt-0">
                    <CodeBlock :code="globeProjectionCode" lang="vue" />
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </section>

          <section class="space-y-4 scroll-mt-20" id="extend-to-build">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Extend to Build</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:leading-7 [&_strong]:text-foreground [&_strong]:font-medium">
              <p>You can extend this to build custom features like:</p>
              <ul>
                <li><strong>Real-time tracking</strong> - Live location updates for delivery, rides, or fleet management</li>
                <li><strong>Geofencing</strong> - Trigger actions when users enter or leave specific areas</li>
                <li><strong>Heatmaps</strong> - Visualize density data like population, crime, or activity hotspots</li>
                <li><strong>Drawing tools</strong> - Let users draw polygons, lines, or place markers for custom areas</li>
                <li><strong>3D buildings</strong> - Extrude building footprints for urban visualization</li>
                <li><strong>Animations</strong> - Animate markers along routes or create fly-through experiences</li>
                <li><strong>Custom data layers</strong> - Overlay weather, traffic, or satellite imagery</li>
              </ul>
            </div>
          </section>
        </div>

        <div class="flex items-center justify-between gap-4 mt-14 pt-8 border-t">
          <router-link to="/docs/clusters" class="group flex flex-col items-start gap-1.5">
            <span class="text-xs text-muted-foreground">Previous</span>
            <span class="text-sm font-medium group-hover:underline underline-offset-4">Clusters</span>
          </router-link>
          <router-link to="/docs/api-reference" class="group flex flex-col items-end gap-1.5">
            <span class="text-xs text-muted-foreground">Next</span>
            <span class="text-sm font-medium group-hover:underline underline-offset-4">API Reference</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
    <DocsToc :sections="tocSections" />
</template>
