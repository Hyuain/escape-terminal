import s from './Home.module.scss'
import { defineComponent } from 'vue'
import { Weather } from '../../components/Weather/Weather'

export const Home = defineComponent({
  setup() {
    return () => <Weather class={s.weatherCard}>
    </Weather>
  }
})
