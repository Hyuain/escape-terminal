import { Router } from 'vue-router'
import { useMADataStore } from '../view/MaximumApocalypseHelper/tools/dataManager'


export const addRouteGuides = (router: Router) => {
  router.beforeEach((to, from) => {
    console.log('xxxTo', to)
    if (to.path === '/sign_in') { return }
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      return {
        path: '/sign_in',
        replace: true,
      }
    }
    if (to.path.startsWith('/ma_helper')) {
      const dataStore = useMADataStore()
      dataStore.loadData().then()
    }
  })
}
