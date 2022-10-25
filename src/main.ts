import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'
import { createPinia } from 'pinia'
import { axiosConfig } from './config/axios.config'
import { addRouteGuides } from './config/router.config'

const router = createRouter({
  routes, history,
})

addRouteGuides(router)

const pinia = createPinia()

axiosConfig()

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
