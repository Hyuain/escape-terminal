import { defineComponent, ref } from 'vue'
import s from './PageWrapper.module.scss'
import { useActionSheet } from '../../stores/actionSheet'
import { ActionSheet } from '../ActionSheet/ActionSheet'

export const PageWrapper = defineComponent({
  emits: ['scroll'],
  setup(props, context) {
    const actionSheet = useActionSheet()
    return () => <div onScroll={(e) => context.emit('scroll', e)} style={{ height: `${window.innerHeight}px` }} class={s.pageWrapper}>
      {context.slots.default?.()}
      {
        actionSheet.actionSheetData.list.length
          ? <div onClick={() => actionSheet.closeActionSheet(-1)} class={s.mask}></div>
          : <div></div>
      }
      {
        actionSheet.actionSheetData.list.length
          ? <ActionSheet list={actionSheet.actionSheetData.list} />
          : <div></div>
      }
    </div>
  }
})
