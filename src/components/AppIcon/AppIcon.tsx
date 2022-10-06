import { defineComponent } from 'vue'
import s from './AppIcon.module.scss'

export const AppIcon = defineComponent({
  props: {
    'name': String,
  },
  emits: ['click'],
  setup(props, context) {
    return () => <div onClick={() => context.emit('click')} class={s.iconWrapper}>
      <div class={s.icon}>
        {context.slots.default?.()}
      </div>
      <div>{props.name}</div>
    </div>
  }
})
