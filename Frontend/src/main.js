import { createApp } from "vue"
import "./style.css"
import "./scss/global.scss"
import "./scss/size.scss"
import "./../src/assets/fonts/stylesheet.css"

import App from "./App.vue"

const app = createApp(App)

app.mount("#app")
