import { defineComponent } from 'vue'
import s from './Card.module.scss'
import CancelSVG from '../../assets/cancel.svg'

export const Card = defineComponent({
  props: {
    isShowCancel: Boolean,
  },
  emits: ['clickCancel'],
  setup(props, context) {
    return () => <div class={s.card}>
      {context.slots.default?.()}
      {props.isShowCancel
        ? <div onClick={() => context.emit('clickCancel')} class={s.cancelIcon}>
          <CancelSVG width={24} height={24}/>
        </div>
        : null}
    </div>
  },
})
