import s from './Home.module.scss'
import { defineComponent } from 'vue'
import { Weather } from '../../components/Weather/Weather'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { AppIcon } from '../../components/AppIcon/AppIcon'
import { FoodRecommendationCard } from '../../components/FoodRecommendationCard/FoodRecommendationCard'
import { useUserStore } from '../../stores/user'
import { IApp } from './Home.interface'
import { useRouter } from 'vue-router'

const appList: IApp[] = [
  { name: 'Chat', icon: 'ICON', path: '/chat/room' },
  { name: 'Chat', icon: 'ICON', path: '/chat/room' },
  { name: 'Chat', icon: 'ICON', path: '/chat/room' },
  { name: 'Chat', icon: 'ICON', path: '/chat/room' },
]

export const Home = defineComponent({
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    userStore.getUser()

    const handleClickApp = (app: IApp) => {
      router.push(app.path)
    }

    return () => <PageWrapper>
      <div>
        Welcome! {userStore.user.email}.
      </div>
      <Weather class={s.weatherCard}></Weather>
      <div class={s.appsContainer}>
        {
          appList.map((app) => {
            return <AppIcon onClick={() => handleClickApp(app)} class={s.app} name={app.name}>{app.icon}</AppIcon>
          })
        }
        <FoodRecommendationCard class={s.widget100}/>
      </div>
    </PageWrapper>
  },
})
