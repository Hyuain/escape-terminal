import { defineComponent, PropType, ref, defineExpose } from 'vue'
import { Bubble } from '../Bubble/Bubble'
import { IChat, IChatUserInfo } from '../../../Chat.interface'
import s from './BubbleList.module.scss'

export const BubbleList = defineComponent({
  props: {
    messages: {
      type: Array as PropType<IChat[]>,
      default: [],
    },
    fromInfo: Object as PropType<IChatUserInfo>,
    toInfo: Object as PropType<IChatUserInfo>,
  },
  emits: ['scroll'],
  setup(props, context) {
    return () => <div ref="wrapper" onScroll={(e) => context.emit('scroll', e)} class={s.list}>
      {props.messages.map((message) => {
        return <Bubble
          class={s.bubble}
          message={message}
          fromInfo={props.fromInfo}
          toInfo={props.toInfo}
        />
      })}
    </div>
  },
})
