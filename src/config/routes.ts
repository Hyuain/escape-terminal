import { RouteRecordRaw } from 'vue-router'
import { SignIn } from '../view/SignIn/SignIn'

export const routes: RouteRecordRaw[] = [
  { path: '/sign_in', component: SignIn },
  { path: '/', component: SignIn }
]
