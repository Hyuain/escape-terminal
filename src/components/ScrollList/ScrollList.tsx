import { defineComponent } from 'vue'
import s from './ScrollList.module.scss'

export const ScrollList = defineComponent({
  setup(props, context) {
    return () => <div class={s.scrollList}>
      {context.slots.default?.()}
    </div>
  },
})
