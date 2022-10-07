import { defineComponent } from 'vue'
import s from './Bubble.module.scss'

export const Bubble = defineComponent({
  setup() {
    return () => <div class={{ [`${s.bubbleWrapper}`]: true, [`${s.me}`]: Math.random() > .5 }}>
      <div class={s.avatar}>

      </div>
      <div class={s.bubble}>
        {new Array(Math.round(Math.random() * 100)).fill('哈').join('')}
      </div>
    </div>
  }
})
