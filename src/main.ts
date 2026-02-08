import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router/index'
import '@/style/theme.scss'
import '@/style/common.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')


