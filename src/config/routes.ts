import { RouteRecordRaw } from 'vue-router'
import { SignIn } from '../view/SignIn/SignIn'
import { SignUp } from '../view/SignUp/SignUp'

export const routes: RouteRecordRaw[] = [
  { path: '/sign_in', component: SignIn },
  { path: '/sign_up', component: SignUp },
  { path: '/', component: SignIn }
]
