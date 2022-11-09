import { defineComponent, PropType } from 'vue'
import s from './NoData.module.scss'
import { NoDataTheme } from '@/components/NoData/NoData.interface'

export const NoData = defineComponent({
  props: {
    text: {
      type: String,
      default: 'No Data',
    },
    theme: {
      type: Number as PropType<NoDataTheme>,
      default: NoDataTheme.LIGHT,
    }
  },
  setup(props) {
    return () => <div class={{
      [`${s.noDataWrapper}`]: true,
      [`${s.dark}`]: props.theme === NoDataTheme.DARK,
      [`${s.light}`]: props.theme === NoDataTheme.LIGHT,
    }}>{props.text}</div>
  }
})
