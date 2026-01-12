<script setup lang="ts">
import MapLibreGL from 'maplibre-gl'
import { inject, onUnmounted, watch, computed, ref, type Ref, type ComputedRef } from 'vue'

type GeoJSONFeature = GeoJSON.Feature<GeoJSON.Point, any>
type FeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Point, any>

interface MapClusterLayerProps {
  data: string | FeatureCollection
  clusterMaxZoom?: number
  clusterRadius?: number
  clusterColors?: [string, string, string]
  clusterThresholds?: [number, number]
  pointColor?: string
}

const props = withDefaults(defineProps<MapClusterLayerProps>(), {
  clusterMaxZoom: 14,
  clusterRadius: 50,
  clusterColors: () => ['#51bbd6', '#f1f075', '#f28cb1'],
  clusterThresholds: () => [100, 750],
  pointColor: '#3b82f6'
})

const emit = defineEmits<{
  pointClick: [feature: GeoJSONFeature, coordinates: [number, number]]
  clusterClick: [clusterId: number, coordinates: [number, number], pointCount: number]
}>()

const map = inject<Ref<MapLibreGL.Map | null>>('map')
const isLoaded = inject<ComputedRef<boolean>>('isMapLoaded')

const generateId = () => `cluster-${Math.random().toString(36).substr(2, 9)}`
const id = computed(() => generateId())
const sourceId = computed(() => `cluster-source-${id.value}`)
const clusterLayerId = computed(() => `clusters-${id.value}`)
const clusterCountLayerId = computed(() => `cluster-count-${id.value}`)
const unclusteredLayerId = computed(() => `unclustered-point-${id.value}`)

const isInitialized = ref(false)

const initializeLayers = () => {
  if (!map?.value || isInitialized.value) return

  const mapInstance = map.value

  // Add source
  mapInstance.addSource(sourceId.value, {
    type: 'geojson',
    data: props.data,
    cluster: true,
    clusterMaxZoom: props.clusterMaxZoom,
    clusterRadius: props.clusterRadius
  })

  // Add cluster circles layer
  mapInstance.addLayer({
    id: clusterLayerId.value,
    type: 'circle',
    source: sourceId.value,
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        props.clusterColors[0],
        props.clusterThresholds[0],
        props.clusterColors[1],
        props.clusterThresholds[1],
        props.clusterColors[2]
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        20,
        props.clusterThresholds[0],
        30,
        props.clusterThresholds[1],
        40
      ]
    }
  })

  // Add cluster count text layer
  mapInstance.addLayer({
    id: clusterCountLayerId.value,
    type: 'symbol',
    source: sourceId.value,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 12
    },
    paint: {
      'text-color': '#fff'
    }
  })

  // Add unclustered point layer
  mapInstance.addLayer({
    id: unclusteredLayerId.value,
    type: 'circle',
    source: sourceId.value,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': props.pointColor,
      'circle-radius': 6
    }
  })

  // Event handlers
  const handleClusterClick = async (e: MapLibreGL.MapMouseEvent & { features?: MapLibreGL.MapGeoJSONFeature[] }) => {
    const features = mapInstance.queryRenderedFeatures(e.point, {
      layers: [clusterLayerId.value]
    })
    if (!features.length) return

    const feature = features[0]
    const clusterId = feature.properties?.cluster_id as number
    const pointCount = feature.properties?.point_count as number
    const coordinates = (feature.geometry as GeoJSON.Point).coordinates as [number, number]

    emit('clusterClick', clusterId, coordinates, pointCount)

    // Default behavior: zoom to cluster
    const source = mapInstance.getSource(sourceId.value) as MapLibreGL.GeoJSONSource
    const zoom = await source.getClusterExpansionZoom(clusterId)
    mapInstance.easeTo({ center: coordinates, zoom })
  }

  const handlePointClick = (e: MapLibreGL.MapMouseEvent & { features?: MapLibreGL.MapGeoJSONFeature[] }) => {
    if (!e.features?.length) return

    const feature = e.features[0]
    const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice() as [number, number]

    // Handle world copies
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
    }

    emit('pointClick', feature as unknown as GeoJSONFeature, coordinates)
  }

  const handleMouseEnterCluster = () => {
    mapInstance.getCanvas().style.cursor = 'pointer'
  }

  const handleMouseLeaveCluster = () => {
    mapInstance.getCanvas().style.cursor = ''
  }

  const handleMouseEnterPoint = () => {
    mapInstance.getCanvas().style.cursor = 'pointer'
  }

  const handleMouseLeavePoint = () => {
    mapInstance.getCanvas().style.cursor = ''
  }

  mapInstance.on('click', clusterLayerId.value, handleClusterClick)
  mapInstance.on('click', unclusteredLayerId.value, handlePointClick)
  mapInstance.on('mouseenter', clusterLayerId.value, handleMouseEnterCluster)
  mapInstance.on('mouseleave', clusterLayerId.value, handleMouseLeaveCluster)
  mapInstance.on('mouseenter', unclusteredLayerId.value, handleMouseEnterPoint)
  mapInstance.on('mouseleave', unclusteredLayerId.value, handleMouseLeavePoint)

  isInitialized.value = true
}

// Watch for map to be loaded
watch(isLoaded ?? ref(false), (loaded) => {
  if (loaded) {
    initializeLayers()
  }
}, { immediate: true })

onUnmounted(() => {
  if (!map?.value || !isInitialized.value) return
  
  const mapInstance = map.value
  try {
    if (mapInstance.getLayer(clusterCountLayerId.value)) mapInstance.removeLayer(clusterCountLayerId.value)
    if (mapInstance.getLayer(unclusteredLayerId.value)) mapInstance.removeLayer(unclusteredLayerId.value)
    if (mapInstance.getLayer(clusterLayerId.value)) mapInstance.removeLayer(clusterLayerId.value)
    if (mapInstance.getSource(sourceId.value)) mapInstance.removeSource(sourceId.value)
  } catch {
    // ignore
  }
})

// Update data when prop changes
watch(() => props.data, (data) => {
  if (!isInitialized.value || !map?.value || typeof data === 'string') return

  const source = map.value.getSource(sourceId.value) as MapLibreGL.GeoJSONSource
  if (source) {
    source.setData(data)
  }
})

// Update styles
watch(() => [props.clusterColors, props.clusterThresholds, props.pointColor], () => {
  if (!isInitialized.value || !map?.value) return

  if (map.value.getLayer(clusterLayerId.value)) {
    map.value.setPaintProperty(clusterLayerId.value, 'circle-color', [
      'step',
      ['get', 'point_count'],
      props.clusterColors[0],
      props.clusterThresholds[0],
      props.clusterColors[1],
      props.clusterThresholds[1],
      props.clusterColors[2]
    ])
    map.value.setPaintProperty(clusterLayerId.value, 'circle-radius', [
      'step',
      ['get', 'point_count'],
      20,
      props.clusterThresholds[0],
      30,
      props.clusterThresholds[1],
      40
    ])
  }

  if (map.value.getLayer(unclusteredLayerId.value)) {
    map.value.setPaintProperty(unclusteredLayerId.value, 'circle-color', props.pointColor)
  }
})
</script>

<template>
  <!-- Cluster layer is rendered directly to the map, no template needed -->
</template>
