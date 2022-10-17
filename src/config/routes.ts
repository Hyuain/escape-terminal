import { RouteRecordRaw } from 'vue-router'
import { SignIn } from '../view/SignIn/SignIn'
import { Home } from '../view/Home/Home'
import { ChatRoom } from '../view/Chat/ChatRoom/ChatRoom'
import { ChatList } from '../view/Chat/ChatList/ChatList'

export const routes: RouteRecordRaw[] = [
  { path: '/sign_in', component: SignIn },
  { path: '/home', component: Home },
  { path: '/chat',
    children: [
      { path: 'room', component: ChatRoom },
      { path: 'list', component: ChatList },
    ]
  },
  { path: '/', component: SignIn }
]
