import { defineComponent, ref } from 'vue'
import s from './ChatInput.module.scss'

export const ChatInput = defineComponent({
  emits: ['send'],
  setup(props, context) {
    const inputRef = ref()

    const handleInput = (e: any) => {
    }

    const handleClickSend = () => {
      context.emit('send', inputRef.value.innerText)
      inputRef.value.innerText = ''
    }

    return () => <div class={s.container}>
      <div class={s.textareaWrapper}>
        <div ref={inputRef} contenteditable onInput={handleInput} class={s.textarea} />
        <div onClick={handleClickSend} class={s.send}>Send</div>
      </div>
    </div>
  },
})
