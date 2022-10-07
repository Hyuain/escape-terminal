import { defineComponent, ref } from 'vue'
import s from './ChatInput.module.scss'

export const ChatInput = defineComponent({
  setup() {
    const handleInput = (e: InputEvent) => {
    }

    return () => <div>
      <div class={s.textareaWrapper}>
        <div contenteditable onInput={(e) => handleInput(e as InputEvent)} class={s.textarea}/>
        <div class={s.send}>Send</div>
      </div>
      {/*<div>哈哈哈</div>*/}
    </div>
  },
})
