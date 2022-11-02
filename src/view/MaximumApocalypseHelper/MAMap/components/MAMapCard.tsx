import { defineComponent, PropType } from 'vue'
import s from './MAMapCard.module.scss'

export const MAMapCard = defineComponent({
  props: {
    players: {
      type: Array as PropType<number[]>,
    }
  },
  setup() {
    return () => <div class={s.card}>

    </div>
  }
})
