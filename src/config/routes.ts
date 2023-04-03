import { RouteRecordRaw } from 'vue-router'
import { SignIn } from '@/view/SignIn/SignIn'
import { Home } from '@/view/Home/Home'
import { ChatRoom } from '@/view/Chat/ChatRoom/ChatRoom'
import { ChatList } from '@/view/Chat/ChatList/ChatList'
import { PlayerList } from '@/view/MaximumApocalypseHelper/PlayerList/PlayerList'
import { Player } from '@/view/MaximumApocalypseHelper/Player/Player'
import { Monster } from '@/view/MaximumApocalypseHelper/Monster/Monster'
import { MonsterList } from '@/view/MaximumApocalypseHelper/MonsterList/MonsterList'
import { MAMap } from '@/view/MaximumApocalypseHelper/MAMap/MAMap'
import { AddPlayersOrMonsters } from '@/view/MaximumApocalypseHelper/AddPlayersOrMonsters/AddPlayersOrMonsters'
import { Setting } from '@/view/Setting/Setting'
import { Profile } from '@/view/Profile/Profile'
import { MemoBooks } from '@/view/Memo/MemoBooks/MemoBooks'
import { MemoBook } from '@/view/Memo/MemoBook/MemoBook'
import { SelectMemoBook } from '@/view/Memo/SelectMemoBook/SelectMemoBook'

export const routes: RouteRecordRaw[] = [
  { path: '/sign_in', component: SignIn },
  { path: '/home', component: Home },
  {
    path: '/chat',
    children: [
      { path: 'room', component: ChatRoom },
      { path: 'list', component: ChatList },
    ],
  },
  {
    path: '/ma_helper',
    children: [
      { path: 'player', component: Player },
      { path: 'player_list', component: PlayerList },
      { path: 'add_pom', component: AddPlayersOrMonsters },
      { path: 'monster', component: Monster },
      { path: 'monster_list', component: MonsterList },
      { path: 'map', component: MAMap },
      { path: '', component: MAMap }
    ]
  },
  {
    path: '/memo',
    children: [
      { path: 'book', component: MemoBook },
      { path: 'books', component: MemoBooks },
      { path: 'select_book', component: SelectMemoBook },
    ]
  },
  {
    path: '/setting',
    component: Setting,
  },
  {
    path: '/profile',
    component: Profile,
  },
  { path: '/', component: Home },
]
