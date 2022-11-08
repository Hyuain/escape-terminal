import { defineComponent } from 'vue'
import s from './Modal.module.scss'
import { useModal } from '@/stores/modal'

export const Modal = defineComponent({
  setup(props, context) {
    const modal = useModal()

    return () => <div class={s.modal}>
      {
        modal.modalData.render
          ? modal.modalData.render()
          : <div class={s.deleteMapModal}>
            <div class={s.title}>{modal.modalData.title}</div>
            <div>{modal.modalData.content}</div>
            <div class={s.buttons}>
              {modal.modalData.onConfirm
                ? <div onClick={() => modal.modalData.onConfirm()} class={[s.button, s.red]}>YES</div>
                : null}
              {modal.modalData.onCancel
                ? <div onClick={() => modal.modalData.onCancel()} class={s.button}>NO</div>
                : null}
            </div>
          </div>
      }
    </div>
  },
})
