import { Router } from 'vue-router'


export const addRouteGuides = (router: Router) => {
  router.beforeEach((to, from) => {
    if (to.name === '/sign_in') { return }
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      return {
        name: '/sign_in',
        replace: true,
      }
    }
  })
}
