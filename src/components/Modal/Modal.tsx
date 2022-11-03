import { defineComponent } from 'vue'
import s from './Modal.module.scss'

export const Modal = defineComponent({
  setup(props, context) {
    return () => <div class={s.modal}>
      {context.slots.default?.()}
    </div>
  }
})
