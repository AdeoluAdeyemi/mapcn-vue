import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/css/globals.css'

// Import routes
import Home from './pages/index.vue'
import GettingStarted from './pages/docs/GettingStarted.vue'
import Installation from './pages/docs/Installation.vue'
import BasicMap from './pages/docs/BasicMap.vue'
import Markers from './pages/docs/Markers.vue'
import Popups from './pages/docs/Popups.vue'
import Routes from './pages/docs/Routes.vue'
import Controls from './pages/docs/Controls.vue'
import Clusters from './pages/docs/Clusters.vue'
import AdvancedUsage from './pages/docs/AdvancedUsage.vue'
import ApiReference from './pages/docs/ApiReference.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/docs/getting-started', component: GettingStarted },
    { path: '/docs/installation', component: Installation },
    { path: '/docs/basic-map', component: BasicMap },
    { path: '/docs/markers', component: Markers },
    { path: '/docs/popups', component: Popups },
    { path: '/docs/routes', component: Routes },
    { path: '/docs/controls', component: Controls },
    { path: '/docs/clusters', component: Clusters },
    { path: '/docs/advanced-usage', component: AdvancedUsage },
    { path: '/docs/api-reference', component: ApiReference },
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
