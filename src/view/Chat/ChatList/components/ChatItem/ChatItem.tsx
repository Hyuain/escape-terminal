import { defineComponent } from 'vue'
import s from './ChatItem.module.scss'

export const ChatItem = defineComponent({
  setup() {
    return () => <div class={s.wrapper}>
      <div class={s.avatarWrapper}>
        <div class={s.avatar}></div>
        <div class={s.badge}>{Math.round(Math.random() * 100)}</div>
      </div>
      <div class={s.content}>
        {new Array(Math.round(Math.random() * 100)).fill('哈').join('')}
      </div>
    </div>
  }
})
