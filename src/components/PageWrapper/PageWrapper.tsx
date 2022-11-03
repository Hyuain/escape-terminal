import { defineComponent, ref } from 'vue'
import s from './PageWrapper.module.scss'
import { useActionSheet } from '../../stores/actionSheet'
import { ActionSheet } from '../ActionSheet/ActionSheet'
import { useModal } from '../../stores/modal'
import { Modal } from '../Modal/Modal'

export const PageWrapper = defineComponent({
  emits: ['scroll'],
  setup(props, context) {
    const actionSheet = useActionSheet()
    const modal = useModal()

    const handleClickMask = () => {
      actionSheet.closeActionSheet(-1)
      modal.closeModal()
    }

    return () => <div onScroll={(e) => context.emit('scroll', e)} style={{ height: `${window.innerHeight}px` }} class={s.pageWrapper}>
      {context.slots.default?.()}
      {
        actionSheet.actionSheetData.list.length || modal.modalData.render
          ? <div onClick={handleClickMask} class={s.mask}></div>
          : <div></div>
      }
      {
        actionSheet.actionSheetData.list.length
          ? <ActionSheet list={actionSheet.actionSheetData.list} />
          : <div></div>
      }
      {
        modal.modalData.render
          ? <Modal>
            {modal.modalData.render()}
          </Modal>
          : <div></div>
      }
    </div>
  }
})
