import { defineComponent } from 'vue'
import s from './Progress.module.scss'

export const Progress = defineComponent({
  props: {
    percentage: {
      type: Number,
      required: true,
    }
  },
  setup(props, context) {
    return () => <div class={s.progressWrapper}>
      <div class={s.progress} style={{ width: `${props.percentage * 100}%` }}></div>
    </div>
  }
})
