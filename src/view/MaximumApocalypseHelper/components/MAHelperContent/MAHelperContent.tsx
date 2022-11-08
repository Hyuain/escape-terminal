import { defineComponent } from 'vue'
import s from './MAHelperContent.module.scss'
import { ScrollList } from '@/components/ScrollList/ScrollList'

export const MAHelperContent = defineComponent({
  setup(props, context) {
    return () => <ScrollList class={s.content}>
      {context.slots.default?.()}
    </ScrollList>
  }
})
