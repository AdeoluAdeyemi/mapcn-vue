<script setup lang="ts">
import { ref } from 'vue'
import { Map, MapMarker, MarkerContent, MarkerPopup, MarkerTooltip, MarkerLabel } from '@/components/map'
import DocsSidebar from '@/components/DocsSidebar.vue'
import DocsToc from '@/components/DocsToc.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { MapPin, Star } from 'lucide-vue-next'

const tocSections = [
  { id: 'basic-example', title: 'Basic Example' },
  { id: 'rich-popups', title: 'Rich Popups' },
  { id: 'draggable-marker', title: 'Draggable Marker' }
]

// Basic markers
const basicMarkers = [
  { id: 1, lng: -0.1276, lat: 51.5074, label: 'London' },
  { id: 2, lng: 2.3522, lat: 48.8566, label: 'Paris' },
  { id: 3, lng: 13.4050, lat: 52.5200, label: 'Berlin' }
]

// Rich popups markers
const richMarkers = [
  { 
    id: 1, 
    lng: -0.1276, 
    lat: 51.5074, 
    label: 'Museum',
    type: 'Museum',
    rating: 4.5,
    description: 'Historical landmark with exhibits',
    image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=200&fit=crop'
  },
  { 
    id: 2, 
    lng: -0.1236, 
    lat: 51.5014, 
    label: 'Landmark',
    type: 'Landmark',
    rating: 4.8,
    description: 'Iconic city attraction',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=200&fit=crop'
  },
  { 
    id: 3, 
    lng: -0.1406, 
    lat: 51.5155, 
    label: 'Transit',
    type: 'Transit',
    rating: 4.2,
    description: 'Major transportation hub',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=200&fit=crop'
  }
]

// Draggable marker
const draggableMarker = ref({ lng: 2.3522, lat: 48.8566 })

const handleDrag = (coords: { lng: number; lat: number }) => {
  draggableMarker.value = coords
}

const basicExampleCode = `<script setup lang="ts">
import { Map, MapMarker, MarkerContent, MarkerPopup, MarkerTooltip } from '@/components/map'

const markers = [
  { id: 1, lng: -0.1276, lat: 51.5074, label: 'London' },
  { id: 2, lng: 2.3522, lat: 48.8566, label: 'Paris' },
  { id: 3, lng: 13.4050, lat: 52.5200, label: 'Berlin' }
]
<\/script>

<template>
  <Map :center="[5, 51.5]" :zoom="4">
    <MapMarker
      v-for="marker in markers"
      :key="marker.id"
      :longitude="marker.lng"
      :latitude="marker.lat"
    >
      <MarkerContent />
      <MarkerTooltip>{{ marker.label }}</MarkerTooltip>
      <MarkerPopup>
        <h3 class="font-semibold">{{ marker.label }}</h3>
        <p class="text-sm text-muted-foreground">
          {{ marker.lng.toFixed(4) }}, {{ marker.lat.toFixed(4) }}
        </p>
      </MarkerPopup>
    </MapMarker>
  </Map>
</template>`

const richPopupsCode = `<script setup lang="ts">
import { Map, MapMarker, MarkerLabel, MarkerPopup } from '@/components/map'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-vue-next'

const markers = [
  { 
    id: 1, 
    lng: -0.1276, 
    lat: 51.5074, 
    label: 'Museum',
    rating: 4.5,
    description: 'Historical landmark',
    image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d'
  }
]
<\/script>

<template>
  <Map :center="[-0.13, 51.51]" :zoom="13">
    <MapMarker
      v-for="marker in markers"
      :key="marker.id"
      :longitude="marker.lng"
      :latitude="marker.lat"
    >
      <div class="size-5 rounded-full bg-rose-500 border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>
      <MarkerLabel>{{ marker.label }}</MarkerLabel>
      <MarkerPopup>
        <div class="w-[280px]">
          <img :src="marker.image" class="w-full h-32 object-cover rounded-t-lg" />
          <div class="p-3 space-y-2">
            <div class="flex items-center gap-2">
              <Star class="size-4 fill-yellow-400 text-yellow-400" />
              <span class="font-semibold">{{ marker.rating }}</span>
            </div>
            <h3 class="font-semibold">{{ marker.label }}</h3>
            <p class="text-sm text-muted-foreground">{{ marker.description }}</p>
            <Button size="sm" class="w-full">View Details</Button>
          </div>
        </div>
      </MarkerPopup>
    </MapMarker>
  </Map>
</template>`

const draggableMarkerCode = `<script setup lang="ts">
import { ref } from 'vue'
import { Map, MapMarker, MarkerPopup } from '@/components/map'
import { MapPin } from 'lucide-vue-next'

const marker = ref({ lng: 2.3522, lat: 48.8566 })

const handleDrag = (coords: { lng: number; lat: number }) => {
  marker.value = coords
}
<\/script>

<template>
  <Map :center="[marker.lng, marker.lat]" :zoom="10">
    <MapMarker
      :longitude="marker.lng"
      :latitude="marker.lat"
      draggable
      @drag="handleDrag"
    >
      <div class="cursor-move">
        <MapPin 
          :size="28" 
          class="fill-black stroke-white dark:fill-white"
        />
      </div>
      <MarkerPopup>
        <div class="space-y-1">
          <p class="font-semibold">Draggable Marker</p>
          <p class="text-xs text-muted-foreground">
            Lng: {{ marker.lng.toFixed(4) }}
          </p>
          <p class="text-xs text-muted-foreground">
            Lat: {{ marker.lat.toFixed(4) }}
          </p>
        </div>
      </MarkerPopup>
    </MapMarker>
  </Map>
</template>`
</script>

<template>
  <div class="flex">
    <DocsSidebar />
    <div class="container py-12 flex-1">
      <div class="mx-auto max-w-5xl">
        <div class="space-y-2">
          <h1 class="text-3xl font-semibold tracking-tight text-foreground">Markers</h1>
          <p class="text-base text-muted-foreground leading-relaxed">Add interactive markers to your map with custom content, popups, and tooltips.</p>
        </div>
        
        <div class="mt-10 space-y-10">
          <section class="space-y-4 scroll-mt-20">
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>Use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">MapMarker</code> to place markers on the map. Each marker can have custom content, popups that open on click, and tooltips that appear on hover.</p>
            </div>
          </section>

          <div class="rounded-lg border bg-muted/40 px-4 py-3 text-[14px] leading-relaxed text-foreground/70 [&_strong]:text-foreground [&_strong]:font-medium">
            <strong>Performance tip:</strong> <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">MapMarker</code> is DOM-based and works best for a few hundred markers. For larger datasets, see the <router-link to="/docs/advanced-usage#example-markers-via-layers" class="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors">GeoJSON layers example</router-link> instead. Rendering many DOM markers can make the browser sluggish.
          </div>

          <section class="space-y-4 scroll-mt-20" id="basic-example">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Basic Example</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>Simple markers with tooltips and popups showing location information.</p>
            </div>

        <Card>
          <Tabs default-value="preview">
            <TabsList class="w-full justify-start border-b rounded-none">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" class="mt-0">
              <div class="relative h-[400px] w-full overflow-hidden">
                <Map :center="[5, 51.5]" :zoom="4">
                  <MapMarker
                    v-for="marker in basicMarkers"
                    :key="marker.id"
                    :longitude="marker.lng"
                    :latitude="marker.lat"
                  >
                    <div class="relative cursor-pointer">
                      <div class="size-4 rounded-full bg-primary border-2 border-white shadow-lg" />
                    </div>
                    <MarkerTooltip>{{ marker.label }}</MarkerTooltip>
                    <MarkerPopup>
                      <div class="space-y-1">
                        <h3 class="font-semibold">{{ marker.label }}</h3>
                        <p class="text-sm text-muted-foreground">
                          {{ marker.lng.toFixed(4) }}, {{ marker.lat.toFixed(4) }}
                        </p>
                      </div>
                    </MarkerPopup>
                  </MapMarker>
                </Map>
              </div>
            </TabsContent>
            
            <TabsContent value="code" class="mt-0">
              <CodeBlock :code="basicExampleCode" lang="vue" />
            </TabsContent>
          </Tabs>
        </Card>
          </section>

          <section class="space-y-4 scroll-mt-20" id="rich-popups">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Rich Popups</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>Build complex popups with images, ratings, and action buttons using shadcn-vue components.</p>
            </div>

        <Card>
          <Tabs default-value="preview">
            <TabsList class="w-full justify-start border-b rounded-none">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" class="mt-0">
              <div class="relative h-[500px] w-full overflow-hidden">
                <Map :center="[-0.13, 51.51]" :zoom="13">
                  <MapMarker
                    v-for="marker in richMarkers"
                    :key="marker.id"
                    :longitude="marker.lng"
                    :latitude="marker.lat"
                  >
                    <div class="relative cursor-pointer">
                      <div class="size-5 rounded-full bg-rose-500 border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>
                      <div class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-foreground top-full mt-1">
                        {{ marker.label }}
                      </div>
                    </div>
                    <MarkerPopup>
                      <div class="w-[280px]">
                        <img :src="marker.image" class="w-full h-32 object-cover rounded-t-lg" />
                        <div class="p-3 space-y-2">
                          <div class="flex items-center gap-2">
                            <Star class="size-4 fill-yellow-400 text-yellow-400" />
                            <span class="font-semibold">{{ marker.rating }}</span>
                          </div>
                          <h3 class="font-semibold">{{ marker.label }}</h3>
                          <p class="text-sm text-muted-foreground">{{ marker.description }}</p>
                          <Button size="sm" class="w-full">View Details</Button>
                        </div>
                      </div>
                    </MarkerPopup>
                  </MapMarker>
                </Map>
              </div>
            </TabsContent>
            
            <TabsContent value="code" class="mt-0">
              <CodeBlock :code="richPopupsCode" lang="vue" />
            </TabsContent>
          </Tabs>
        </Card>
          </section>

          <section class="space-y-4 scroll-mt-20" id="draggable-marker">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Draggable Marker</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>Create draggable markers that users can move around the map. Click the marker to see its current coordinates in a popup.</p>
            </div>

        <Card>
          <Tabs default-value="preview">
            <TabsList class="w-full justify-start border-b rounded-none">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" class="mt-0">
              <div class="relative h-[400px] w-full overflow-hidden">
                <Map :center="[draggableMarker.lng, draggableMarker.lat]" :zoom="10">
                  <MapMarker
                    :longitude="draggableMarker.lng"
                    :latitude="draggableMarker.lat"
                    draggable
                    @drag="handleDrag"
                  >
                    <div class="relative cursor-pointer">
                      <div class="cursor-move">
                        <MapPin 
                          :size="28" 
                          class="fill-black stroke-white dark:fill-white"
                        />
                      </div>
                    </div>
                    <MarkerPopup>
                      <div class="space-y-1">
                        <p class="font-semibold">Draggable Marker</p>
                        <p class="text-xs text-muted-foreground">
                          Lng: {{ draggableMarker.lng.toFixed(4) }}
                        </p>
                        <p class="text-xs text-muted-foreground">
                          Lat: {{ draggableMarker.lat.toFixed(4) }}
                        </p>
                      </div>
                    </MarkerPopup>
                  </MapMarker>
                </Map>
              </div>
            </TabsContent>
            
            <TabsContent value="code" class="mt-0">
              <CodeBlock :code="draggableMarkerCode" lang="vue" />
            </TabsContent>
          </Tabs>
        </Card>
          </section>
        </div>

        <div class="flex items-center justify-between gap-4 mt-14 pt-8 border-t">
          <router-link to="/docs/basic-map" class="group flex flex-col items-start gap-1.5">
            <span class="text-xs text-muted-foreground">Previous</span>
            <span class="text-sm font-medium group-hover:underline underline-offset-4">Basic Map</span>
          </router-link>
          <router-link to="/docs/popups" class="group flex flex-col items-end gap-1.5">
            <span class="text-xs text-muted-foreground">Next</span>
            <span class="text-sm font-medium group-hover:underline underline-offset-4">Popups</span>
          </router-link>
        </div>
      </div>
    </div>
    <DocsToc :sections="tocSections" />
  </div>
</template>
