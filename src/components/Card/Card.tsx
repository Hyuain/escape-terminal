import { defineComponent, PropType } from 'vue'
import s from './Card.module.scss'
import CancelSVG from '../../assets/cancel.svg'
import PlusSVG from '../../assets/plus.svg'

export const Card = defineComponent({
  props: {
    isShowCancel: Boolean,
    addNewItem: {
      type: Object as PropType<{
        text: string
      }>,
    },
  },
  emits: ['clickCancel', 'clickAdd'],
  setup(props, context) {
    return () => <div class={s.card}>
      {context.slots.default?.()}
      {props.isShowCancel
        ? <div onClick={() => context.emit('clickCancel')} class={s.cancelIcon}>
          <CancelSVG width={24} height={24}/>
        </div>
        : null}
      {props.addNewItem
        ? <div class={s.add} onClick={() => context.emit('clickAdd')}>
          <div class={s.addIcon}>
            <PlusSVG width={32} height={32}/>
          </div>
          <div class={s.addText}>
            {props.addNewItem.text}
          </div>
        </div>
        : null}
    </div>
  },
})
