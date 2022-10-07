import { defineComponent, ref } from 'vue'
import s from './PageWrapper.module.scss'

export const PageWrapper = defineComponent({
  setup(props, context) {
    return () => <div style={{ height: `${window.innerHeight}px` }} class={s.pageWrapper}>
      {context.slots.default?.()}
    </div>
  }
})
