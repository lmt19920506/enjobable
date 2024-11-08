// import { GlobalComponents } from './../components.d';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import './style.css'
import './assets/styles/index.scss'
import App from './App.vue'
// 导入路由
import router from './router'
import 'element-plus/dist/index.css'
import '@/assets/styles/var.scss'


const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
