<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Map, MapRoute, MapMarker, MapControls } from '@/components/map'
import DocsSidebar from '@/components/DocsSidebar.vue'
import DocsToc from '@/components/DocsToc.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Clock, Route, Copy, Check } from 'lucide-vue-next'

const tocSections = [
  { id: 'basic-route', title: 'Basic Route' },
  { id: 'route-planning', title: 'Route Planning' }
]

// Basic route with numbered markers
const basicRoute = [
  [-0.1276, 51.5074], // London
  [2.3522, 48.8566],  // Paris
  [4.9, 52.37],       // Amsterdam
  [13.4050, 52.5200]  // Berlin
] as [number, number][]

// Route planning with OSRM
const start = [4.9, 52.37] as [number, number] // Amsterdam
const end = [4.48, 51.92] as [number, number] // Rotterdam

const routes = ref<Array<{
  coordinates: [number, number][]
  duration: number
  distance: number
  isFastest?: boolean
}>>([])
const selectedRouteIndex = ref(0)
const isLoading = ref(false)

const fetchRoutes = async () => {
  isLoading.value = true
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?alternatives=true&geometries=geojson`
    )
    const data = await response.json()
    
    if (data.routes) {
      routes.value = data.routes.map((route: any, index: number) => ({
        coordinates: route.geometry.coordinates,
        duration: route.duration,
        distance: route.distance,
        isFastest: index === 0
      }))
    }
  } catch (error) {
    console.error('Failed to fetch routes:', error)
  } finally {
    isLoading.value = false
  }
}

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

const formatDistance = (meters: number) => {
  return `${(meters / 1000).toFixed(1)} km`
}

onMounted(async () => {
  try {
    await fetchRoutes()
  } catch (error) {
    console.error('Failed to fetch routes on mount:', error)
  }
})

const basicRouteCode = `<script setup lang="ts">
import { Map, MapRoute, MapMarker, MapControls } from '@/components/map'

const route = [
  [-0.1276, 51.5074], // London
  [2.3522, 48.8566],  // Paris
  [4.9, 52.37],       // Amsterdam
  [13.4050, 52.5200]  // Berlin
] as [number, number][]
<\/script>

<template>
  <Map :center="[5, 51.5]" :zoom="4.5">
    <MapRoute :coordinates="route" color="#3b82f6" :width="3" />
    
    <MapMarker
      v-for="(coord, i) in route"
      :key="i"
      :longitude="coord[0]"
      :latitude="coord[1]"
    >
      <div class="size-4.5 rounded-full bg-blue-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-semibold">
        {{ i + 1 }}
      </div>
    </MapMarker>
    
    <MapControls show-zoom />
  </Map>
</template>`

const routePlanningCode = `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Map, MapRoute, MapMarker, MapControls } from '@/components/map'
import { Button } from '@/components/ui/button'

const start = [4.9, 52.37] as [number, number] // Amsterdam
const end = [4.48, 51.92] as [number, number] // Rotterdam

const routes = ref<Array<{
  coordinates: [number, number][]
  duration: number
  distance: number
  isFastest?: boolean
}>>([])
const selectedRouteIndex = ref(0)

const fetchRoutes = async () => {
  const response = await fetch(
    \`https://router.project-osrm.org/route/v1/driving/\${start[0]},\${start[1]};\${end[0]},\${end[1]}?alternatives=true&geometries=geojson\`
  )
  const data = await response.json()
  
  if (data.routes) {
    routes.value = data.routes.map((route: any, index: number) => ({
      coordinates: route.geometry.coordinates,
      duration: route.duration,
      distance: route.distance,
      isFastest: index === 0
    }))
  }
}

onMounted(() => {
  fetchRoutes()
})
<\/script>

<template>
  <Map :center="[4.7, 52.1]" :zoom="8.5">
    <MapRoute
      v-for="(route, i) in routes"
      :key="i"
      :coordinates="route.coordinates"
      :color="i === selectedRouteIndex ? '#3b82f6' : '#94a3b8'"
      :width="i === selectedRouteIndex ? 4 : 2"
      :opacity="i === selectedRouteIndex ? 0.9 : 0.5"
      @click="selectedRouteIndex = i"
    />
    
    <MapMarker :longitude="start[0]" :latitude="start[1]">
      <div class="size-5 rounded-full bg-green-500 border-2 border-white shadow-lg"></div>
    </MapMarker>
    
    <MapMarker :longitude="end[0]" :latitude="end[1]">
      <div class="size-5 rounded-full bg-red-500 border-2 border-white shadow-lg"></div>
    </MapMarker>
    
    <MapControls show-zoom />
  </Map>
</template>`

// Copy state for each code section
const copiedBasic = ref(false)
const copiedPlanning = ref(false)

const copyBasicRoute = async () => {
  await navigator.clipboard.writeText(basicRouteCode)
  copiedBasic.value = true
  setTimeout(() => {
    copiedBasic.value = false
  }, 2000)
}

const copyRoutePlanning = async () => {
  await navigator.clipboard.writeText(routePlanningCode)
  copiedPlanning.value = true
  setTimeout(() => {
    copiedPlanning.value = false
  }, 2000)
}
</script>

<template>
  <div class="flex">
    <DocsSidebar />
    <div class="container py-12 flex-1">
      <div class="mx-auto max-w-5xl">
        <div class="space-y-2">
          <h1 class="text-3xl font-semibold tracking-tight text-foreground">Routes</h1>
          <p class="text-base text-muted-foreground leading-relaxed">Draw routes and paths between locations on your map.</p>
        </div>
        
        <div class="mt-10 space-y-10">
          <section class="space-y-4 scroll-mt-20">
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>Use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">MapRoute</code> to draw lines connecting a series of coordinates. Perfect for showing directions, trails, or any path between points.</p>
            </div>
          </section>

          <section class="space-y-4 scroll-mt-20" id="basic-route">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Basic Route</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>Draw a route with numbered stop markers along the path.</p>
            </div>

        <Card>
          <Tabs default-value="preview">
            <TabsList class="w-full justify-start border-b rounded-none relative">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <button 
                class="absolute right-2 p-1.5 rounded hover:bg-muted transition-colors" 
                @click="copyBasicRoute"
                aria-label="Copy code"
              >
                <Check v-if="copiedBasic" class="size-3.5 text-green-500" />
                <Copy v-else class="size-3.5 text-muted-foreground" />
              </button>
            </TabsList>
            
            <TabsContent value="preview" class="mt-0">
              <div class="relative h-[400px] w-full overflow-hidden">
                <Map :center="[5, 51.5]" :zoom="4.5">
                  <MapRoute :coordinates="basicRoute" color="#3b82f6" :width="3" />
                  
                  <MapMarker
                    v-for="(coord, i) in basicRoute"
                    :key="i"
                    :longitude="coord[0]"
                    :latitude="coord[1]"
                  >
                    <div class="size-4.5 rounded-full bg-blue-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-semibold">
                      {{ i + 1 }}
                    </div>
                  </MapMarker>
                  
                  <MapControls show-zoom />
                </Map>
              </div>
            </TabsContent>
            
            <TabsContent value="code" class="mt-0">
              <CodeBlock :code="basicRouteCode" lang="vue" />
            </TabsContent>
          </Tabs>
        </Card>
          </section>

          <section class="space-y-4 scroll-mt-20" id="route-planning">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Route Planning</h2>
            <div class="text-foreground/80 text-base sm:text-[15px] leading-7 space-y-3 [&_p]:leading-7">
              <p>Display multiple route options and let users select between them. This example fetches real driving directions from the <a target="_blank" rel="noopener noreferrer" class="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors" href="https://project-osrm.org/">OSRM API</a>. Click on a route or use the buttons to switch.</p>
            </div>

            <Card>
              <Tabs default-value="preview">
                <TabsList class="w-full justify-start border-b rounded-none relative">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <button 
                    class="absolute right-2 p-1.5 rounded hover:bg-muted transition-colors" 
                    @click="copyRoutePlanning"
                    aria-label="Copy code"
                  >
                    <Check v-if="copiedPlanning" class="size-3.5 text-green-500" />
                    <Copy v-else class="size-3.5 text-muted-foreground" />
                  </button>
                </TabsList>
                
                <TabsContent value="preview" class="mt-0">
                  <div class="relative h-[500px] w-full overflow-hidden">
                    <Map :center="[4.7, 52.1]" :zoom="8.5">
                      <MapRoute
                        v-for="(route, i) in routes"
                        :key="i"
                        :coordinates="route.coordinates"
                        :color="i === selectedRouteIndex ? '#3b82f6' : '#94a3b8'"
                        :width="i === selectedRouteIndex ? 4 : 2"
                        :opacity="i === selectedRouteIndex ? 0.9 : 0.5"
                        @click="selectedRouteIndex = i"
                      />
                      
                      <MapMarker :longitude="start[0]" :latitude="start[1]">
                        <div class="relative cursor-pointer">
                          <div class="size-5 rounded-full bg-green-500 border-2 border-white shadow-lg"></div>
                          <div class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-foreground bottom-full mb-1">
                            Amsterdam
                          </div>
                        </div>
                      </MapMarker>
                      
                      <MapMarker :longitude="end[0]" :latitude="end[1]">
                        <div class="relative cursor-pointer">
                          <div class="size-5 rounded-full bg-red-500 border-2 border-white shadow-lg"></div>
                          <div class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-foreground top-full mt-1">
                            Rotterdam
                          </div>
                        </div>
                      </MapMarker>
                      
                      <MapControls show-zoom />
                    </Map>

                    <div v-if="!isLoading && routes.length" class="absolute top-3 left-3 flex flex-col gap-2">
                      <Button
                        v-for="(route, i) in routes"
                        :key="i"
                        :variant="i === selectedRouteIndex ? 'default' : 'secondary'"
                        size="sm"
                        @click="selectedRouteIndex = i"
                        class="justify-start gap-3"
                      >
                        <div class="flex items-center gap-1.5">
                          <Clock class="size-3.5" />
                          <span class="font-medium">{{ formatDuration(route.duration) }}</span>
                        </div>
                        <div class="flex items-center gap-1.5 text-xs opacity-80">
                          <Route class="size-3" />
                          {{ formatDistance(route.distance) }}
                        </div>
                        <span v-if="route.isFastest" class="text-[10px] px-1.5 py-0.5 rounded font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Fastest
                        </span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="code" class="mt-0">
                  <CodeBlock :code="routePlanningCode" lang="vue" />
                </TabsContent>
              </Tabs>
            </Card>
          </section>
        </div>

        <div class="flex items-center justify-between gap-4 mt-14 pt-8 border-t">
          <router-link to="/docs/popups" class="group flex flex-col items-start gap-1.5">
            <span class="text-xs text-muted-foreground">Previous</span>
            <span class="text-sm font-medium group-hover:underline underline-offset-4">Popups</span>
          </router-link>
          <router-link to="/docs/controls" class="group flex flex-col items-end gap-1.5">
            <span class="text-xs text-muted-foreground">Next</span>
            <span class="text-sm font-medium group-hover:underline underline-offset-4">Controls</span>
          </router-link>
        </div>
      </div>
    </div>
    <DocsToc :sections="tocSections" />
  </div>
</template>
