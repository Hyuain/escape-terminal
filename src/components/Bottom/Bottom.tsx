import { defineComponent } from 'vue'
import s from './Bottom.module.scss'

export const Bottom = defineComponent({
  props: {
    text: String,
  },
  emits: ['click'],
  setup(props, context) {
    return () => <div onClick={(e) => context.emit('click', e)} class={s.bottomWrapper}>
      {props.text}
    </div>
  }
})
