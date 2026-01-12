<script setup lang="ts">
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/map'
import DocsSidebar from '@/components/DocsSidebar.vue'
import DocsToc from '@/components/DocsToc.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import { Card } from '@/components/ui/card'
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs'

const tocSections = [
  { id: 'controls', title: 'Controls' }
]

const codeExample = `<script setup lang="ts">
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/map'
<\/script>

<template>
  <Map :center="[-0.1276, 51.5074]" :zoom="10">
    <MapMarker :longitude="-0.1276" :latitude="51.5074">
      <MarkerContent />
    </MapMarker>
    <MapControls 
      show-zoom 
      show-compass 
      show-locate 
      show-fullscreen 
    />
  </Map>
</template>`
</script>

<template>
  <div class="flex">
    <DocsSidebar />
    <div class="container py-12 flex-1">
      <div class="mx-auto max-w-5xl">
        <div class="space-y-2">
          <h1 class="text-3xl font-semibold tracking-tight text-foreground">Map Controls</h1>
          <p class="text-base text-muted-foreground leading-relaxed">Add interactive controls including zoom, compass, locate, and fullscreen buttons.</p>
        </div>
        
        <div class="mt-10">

        <Card>
          <Tabs default-value="preview">
            <TabsList class="w-full justify-start border-b rounded-none">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" class="mt-0">
              <div class="relative h-[500px] w-full overflow-hidden">
                <Map :center="[-0.1276, 51.5074]" :zoom="10">
                  <MapMarker :longitude="-0.1276" :latitude="51.5074">
                    <MarkerContent />
                  </MapMarker>
                  <MapControls 
                    show-zoom 
                    show-compass 
                    show-locate 
                    show-fullscreen 
                  />
                </Map>
              </div>
            </TabsContent>
            
            <TabsContent value="code" class="mt-0">
              <CodeBlock :code="codeExample" lang="vue" />
            </TabsContent>
          </Tabs>
        </Card>
        </div>

        <div class="flex items-center justify-between gap-4 mt-14 pt-8 border-t">
          <router-link to="/docs/routes" class="group flex flex-col items-start gap-1.5">
            <span class="text-xs text-muted-foreground">Previous</span>
            <span class="text-sm font-medium group-hover:underline underline-offset-4">Routes</span>
          </router-link>
          <router-link to="/docs/clusters" class="group flex flex-col items-end gap-1.5">
            <span class="text-xs text-muted-foreground">Next</span>
            <span class="text-sm font-medium group-hover:underline underline-offset-4">Clusters</span>
          </router-link>
        </div>
      </div>
    </div>
    <DocsToc :sections="tocSections" />
  </div>
</template>
