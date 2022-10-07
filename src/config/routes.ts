import { RouteRecordRaw } from 'vue-router'
import { SignIn } from '../view/SignIn/SignIn'
import { Home } from '../view/Home/Home'
import { ChatRoom } from '../view/Chat/ChatRoom/ChatRoom'

export const routes: RouteRecordRaw[] = [
  { path: '/sign_in', component: SignIn },
  { path: '/home', component: Home },
  { path: '/chat',
    children: [
      { path: 'chat_room', component: ChatRoom },
    ]
  },
  { path: '/', component: SignIn }
]
