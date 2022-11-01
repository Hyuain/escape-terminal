import { defineComponent, ref } from 'vue'
import s from './PageWrapper.module.scss'

export const PageWrapper = defineComponent({
  emits: ['scroll'],
  setup(props, context) {
    return () => <div onScroll={(e) => context.emit('scroll', e)} style={{ height: `${window.innerHeight}px` }} class={s.pageWrapper}>
      {context.slots.default?.()}
    </div>
  }
})
