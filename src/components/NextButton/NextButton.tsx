import { defineComponent } from 'vue'
import { Circle } from '../Circle/Circle'
import s from './NextButton.module.scss'

export const NextButton = defineComponent({
  setup(props) {
    return () => <div class={s.buttonWrapper}>
      <Circle class={s.button} size={64}>
      go!
      </Circle>
    </div>
  }
})
