import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './scss/global.scss'
import './scss/size.scss'
import './../src/assets/fonts/stylesheet.css'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).mount('#app')
