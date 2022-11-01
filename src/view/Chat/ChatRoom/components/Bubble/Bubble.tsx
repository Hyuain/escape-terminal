import { defineComponent, PropType } from 'vue'
import s from './Bubble.module.scss'
import { ChatDirection, ChatType, IChat } from '../../../Chat.interface'

export const Bubble = defineComponent({
  props: {
    message: Object as PropType<IChat>,
  },
  setup(props) {

    return () => <div
      class={{ [`${s.bubbleWrapper}`]: true, [`${s.me}`]: props.message!.direction === ChatDirection.FROM_USER }}>
      <div class={s.avatar}>

      </div>
      <div class={s.bubble}>
        {
          props.message!.content.type === ChatType.TEXT
            ? props.message!.content.resource.text
            : null
        }
      </div>
    </div>
  },
})
