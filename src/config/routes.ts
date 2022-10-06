import { RouteRecordRaw } from 'vue-router'
import { SignIn } from '../view/SignIn/SignIn'
import { Home } from '../view/Home/Home'

export const routes: RouteRecordRaw[] = [
  { path: '/sign_in', component: SignIn },
  { path: '/home', component: Home },
  { path: '/', component: SignIn }
]
