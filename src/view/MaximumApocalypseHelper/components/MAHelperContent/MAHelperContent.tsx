import { defineComponent } from 'vue'
import s from './MAHelperContent.module.scss'

export const MAHelperContent = defineComponent({
  setup(props, context) {
    return () => <div class={s.content}>
      {context.slots.default?.()}
    </div>
  }
})
