import { defineComponent } from 'vue'
import s from './Header.module.scss'

export const Header = defineComponent({
  props: {
    title: String,
    right: Function,
  },
  emits: ['clickBack'],
  setup(props, context) {
    return () => <div class={s.header}>
      <div onClick={() => context.emit('clickBack')} class={s.left}>Back</div>
      <div class={s.mid}>{props.title || context.slots.default?.()}</div>
      <div class={s.right}>{props.right?.()}</div>
    </div>
  }
})
