<script setup lang="ts">
import { ref } from 'vue'
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/map'
import DocsSidebar from '@/components/DocsSidebar.vue'
import DocsToc from '@/components/DocsToc.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Copy, Check } from 'lucide-vue-next'

const tocSections = [
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'installation', title: 'Installation' },
  { id: 'usage', title: 'Usage' }
]

const installCommand = `npx shadcn-vue@latest add https://mapcn-vue-ts.vercel.app/registry.json`
const copied = ref(false)

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(installCommand)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const usageCode = `<script setup lang="ts">
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/map'
<\/script>

<template>
  <div class="h-screen">
    <Map :center="[0, 0]" :zoom="2">
      <MapMarker :longitude="0" :latitude="0">
        <MarkerContent />
      </MapMarker>
      <MapControls show-zoom />
    </Map>
  </div>
</template>`
</script>

<template>
  <div class="flex">
    <DocsSidebar />
    <div class="container py-12 flex-1">
      <div class="mx-auto max-w-3xl">
        <div class="space-y-2">
          <h1 class="text-3xl font-semibold tracking-tight text-foreground">Installation</h1>
          <p class="text-base text-muted-foreground leading-relaxed">How to install and set up mapcn-vue in your project.</p>
        </div>

        <div class="mt-10 space-y-10">
          <section class="space-y-4 scroll-mt-20" id="prerequisites">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Prerequisites</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>A Vue 3 project with <a target="_blank" rel="noopener noreferrer" class="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors" href="https://tailwindcss.com">Tailwind CSS</a> and <a target="_blank" rel="noopener noreferrer" class="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors" href="https://www.shadcn-vue.com">shadcn-vue</a> set up.</p>
            </div>
          </section>

          <section class="space-y-4 scroll-mt-20" id="installation">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>Run the following command to add the map component:</p>
              
              <div class="w-full rounded-lg border overflow-hidden">
                <div class="flex items-center justify-end border-b bg-muted/30 px-2 h-9">
                  <button 
                    class="p-1.5 rounded hover:bg-muted transition-colors" 
                    @click="copyToClipboard"
                    aria-label="Copy code"
                  >
                    <Check v-if="copied" class="size-3.5 text-green-500" />
                    <Copy v-else class="size-3.5 text-muted-foreground" />
                  </button>
                </div>
                <div class="p-4 overflow-auto text-sm bg-muted/20">
                  <pre class="bg-transparent m-0"><code>{{ installCommand }}</code></pre>
                </div>
              </div>

              <p>This will install <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">maplibre-gl</code> and add the map component to your project.</p>
            </div>
          </section>

          <section class="space-y-4 scroll-mt-20" id="usage">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>Import and use the map component:</p>
              
              <Tabs default-value="preview" class="w-full">
                <div class="w-full rounded-lg border overflow-hidden">
                  <TabsList class="w-full justify-start border-b rounded-none">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="preview" class="mt-0">
                    <div class="relative h-[400px] w-full overflow-hidden">
                      <Map :center="[0, 0]" :zoom="2">
                        <MapMarker :longitude="0" :latitude="0">
                          <MarkerContent />
                        </MapMarker>
                        <MapControls show-zoom />
                      </Map>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" class="mt-0">
                    <div class="p-4 overflow-auto text-sm bg-muted/20 [&_pre]:bg-transparent! [&_code]:bg-transparent!">
                      <CodeBlock :code="usageCode" lang="vue" />
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </section>

          <div class="rounded-lg border bg-muted/40 px-4 py-3 text-[14px] leading-relaxed text-foreground/70 [&_strong]:text-foreground [&_strong]:font-medium">
            <strong>Note:</strong> The map uses free CARTO basemap tiles by default. No API key required. Tiles automatically switch between light and dark themes.
          </div>
        </div>

        <div class="flex items-center justify-between gap-4 mt-14 pt-8 border-t">
          <router-link to="/docs" class="group flex flex-col items-start gap-1.5">
            <span class="text-xs text-muted-foreground">Previous</span>
            <span class="text-sm font-medium group-hover:underline underline-offset-4">Getting Started</span>
          </router-link>
          <router-link to="/docs/basic-map" class="group flex flex-col items-end gap-1.5">
            <span class="text-xs text-muted-foreground">Next</span>
            <span class="text-sm font-medium group-hover:underline underline-offset-4">Basic Map</span>
          </router-link>
        </div>
      </div>
    </div>
    <DocsToc :sections="tocSections" />
  </div>
</template>