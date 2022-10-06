import s from './Home.module.scss'
import { defineComponent } from 'vue'
import { Weather } from '../../components/Weather/Weather'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { AppIcon } from '../../components/AppIcon/AppIcon'
import { FoodRecommendationCard } from '../../components/FoodRecommendationCard/FoodRecommendationCard'

export const Home = defineComponent({
  setup() {
    return () => <PageWrapper>
      <Weather class={s.weatherCard}></Weather>
      <div class={s.appsContainer}>
        <AppIcon class={s.app} name='Chat'>ICON</AppIcon>
        <AppIcon class={s.app} name='Chat'>ICON</AppIcon>
        <AppIcon class={s.app} name='Chat'>ICON</AppIcon>
        <AppIcon class={s.app} name='Chat'>ICON</AppIcon>
        <FoodRecommendationCard class={s.widget100} />
      </div>
    </PageWrapper>
  }
})
