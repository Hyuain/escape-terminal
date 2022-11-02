import { defineComponent, PropType } from 'vue'
import s from './ActionSheet.module.scss'
import { IActionSheetItem } from '../../stores/actionSheet.interface'
import { useActionSheet } from '../../stores/actionSheet'

export const ActionSheet = defineComponent({
  props: {
    list: Array as PropType<IActionSheetItem[]>,
  },
  setup(props) {
    const actionSheet = useActionSheet()

    return () => <div class={s.actionSheet}>
      {props.list?.map((item, index) => {
        return <div onClick={() => actionSheet.closeActionSheet(index)}>{item.text}</div>
      })}
    </div>
  },
})
