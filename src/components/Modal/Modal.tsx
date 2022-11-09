import { defineComponent } from 'vue'
import s from './Modal.module.scss'
import { useModal } from '@/stores/modal'
import { NoData } from '@/components/NoData/NoData'

export const Modal = defineComponent({
  setup(props, context) {
    const modal = useModal()

    return () => <div class={s.modal}>
      {
        modal.modalData.render
          ? modal.modalData.render()
          : modal.modalData.list
            ? <div class={s.listModal}>
              {modal.modalData.list?.length
                ? modal.modalData.list.map((item, index) => <div
                  onClick={() => modal.modalData.onClickListItem(index)}
                >{item}</div>)
                : <NoData/>}
            </div>
            : <div>
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
