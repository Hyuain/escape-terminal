import { createApp } from 'vue'
import './style.css'
import { App } from './App'
import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'

const router = createRouter({
  routes, history,
})

createApp(App)
  // .use(router)
  .mount('#app')
