import { defineComponent } from 'vue'
import s from './Circle.module.scss'

export const Circle = defineComponent({
  props: {
    size: {
      default: 32,
      type: Number,
    },
  },
  setup(props, context) {
    return () => <div class={s.circle} style={{ width: `${props.size}px`, height: `${props.size}px` }}>
      {context.slots.default?.()}
    </div>
  }
})
