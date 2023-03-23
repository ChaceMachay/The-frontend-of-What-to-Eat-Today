import { createApp } from 'vue'
import App from './App.vue'
//import router from '~/router'
import ElementPlus from 'element-plus'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
//app.use(router)
app.mount('#app')