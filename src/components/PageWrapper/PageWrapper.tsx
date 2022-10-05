import { defineComponent } from 'vue'
import s from './PageWrapper.module.scss'

export const PageWrapper = defineComponent({
  setup(props, context) {
    return () => <div class={s.pageWrapper}>
      {context.slots.default?.()}
    </div>
  }
})
