import { defineComponent, PropType, ref, defineExpose } from 'vue'
import { Bubble } from '../Bubble/Bubble'
import s from './BubbleList.module.scss'
import { IChat } from '../../../Chat.interface'

export const BubbleList = defineComponent({
  props: {
    messages: {
      type: Array as PropType<IChat[]>,
      default: [],
    },
  },
  emits: ['scroll'],
  setup(props, context) {
    return () => <div ref='wrapper' onScroll={(e) => context.emit('scroll', e)} class={s.list}>
      {props.messages.map((message) => {
        return <Bubble message={message} class={s.bubble}></Bubble>
      })}
    </div>
  }
})
