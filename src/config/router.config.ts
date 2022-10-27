import { Router } from 'vue-router'


export const addRouteGuides = (router: Router) => {
  router.beforeEach((to, from) => {
    console.log('xxxTo', to.name)
    if (to.name === '/sign_in' || !to.name) { return }
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      return {
        name: '/sign_in',
        replace: true,
      }
    }
  })
}
