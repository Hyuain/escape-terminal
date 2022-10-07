import { defineComponent } from 'vue'
import { Bubble } from '../Bubble/Bubble'
import s from './BubbleList.module.scss'

export const BubbleList = defineComponent({
  setup() {
    return () => <div class={s.list}>
      {new Array(5).fill(1).map(() => {
        return <Bubble class={s.bubble}></Bubble>
      })}
    </div>
  }
})
