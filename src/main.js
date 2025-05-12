import '@/styles/commen.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VNetworkGraph)
app.mount('#app')
