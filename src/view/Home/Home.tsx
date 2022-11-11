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
  { name: 'MA Helper', icon: 'ICON', 'path': '/ma_helper' },
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
      <Weather class={s.weatherCard}></Weather>
      <div class={s.appsContainer}>
        <div class={s.widget100}>
          <div class={[s.widget50, s.cableWrapper]}>
            <img class={[s.cable]} src='/cables.svg' />
          </div>
        </div>
        <div class={s.widget50}>
          <FoodRecommendationCard />
        </div>
        <div class={[s.widget50, s.appCard]}>
          {
            appList.map((app) => {
              return <AppIcon onClick={() => handleClickApp(app)} class={s.app} name={app.name}>
                <img src="/app-default.svg"/>
              </AppIcon>
            })
          }
        </div>
      </div>
    </PageWrapper>
  },
})
