import { defineComponent } from 'vue'
import { Circle } from '../Circle/Circle'
import s from './NextButton.module.scss'

export const NextButton = defineComponent({
  emits: ['click'],
  setup(props, context) {
    return () => <div class={s.buttonWrapper}>
      <Circle onClick={() => context.emit('click')} class={s.button} size={80}>
      go!
      </Circle>
    </div>
  }
})
