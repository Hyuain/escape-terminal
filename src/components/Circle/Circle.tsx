import { defineComponent } from 'vue'
import s from './Circle.module.scss'

export const Circle = defineComponent({
  props: {
    size: {
      default: 32,
      type: Number,
    },
  },
  emits: ['click'],
  setup(props, context) {
    return () => <div
      onClick={() => context.emit('click')}
      class={s.circle}
      style={{ width: `${props.size}px`, height: `${props.size}px` }}
    >
      {context.slots.default?.()}
    </div>
  }
})
