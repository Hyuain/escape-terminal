import { defineComponent, PropType } from 'vue'
import s from './Bubble.module.scss'
import { ChatDirection, ChatType, IChat, IChatUserInfo } from '../../../Chat.interface'
import { useUserStore } from '@/stores/user'
import { getImageUrl } from '@/shared/tools'

export const Bubble = defineComponent({
  props: {
    message: Object as PropType<IChat>,
    fromInfo: Object as PropType<IChatUserInfo>,
    toInfo: Object as PropType<IChatUserInfo>,
  },
  setup(props) {

    console.log(props.fromInfo, props.toInfo)

    return () => <div
      class={{ [`${s.bubbleWrapper}`]: true, [`${s.me}`]: props.message!.direction === ChatDirection.FROM_USER }}>
      <div class={s.avatar}>
        <img src={props.message?.direction === ChatDirection.FROM_ROBOT ? getImageUrl(props.toInfo!.avatar!) : getImageUrl(props.fromInfo!.avatar!)} />
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
