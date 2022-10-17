import { defineComponent } from 'vue'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { Header } from '../../../components/Header/Header'
import { ChatItem } from './components/ChatItem/ChatItem'
import s from './ChatList.module.scss'

export const ChatList = defineComponent({

  setup() {
    return () => <PageWrapper>
      <Header right={() => <>个人页面</>} />
      <div class={s.contentWrapper}>
        {new Array(5).fill(1).map(() => {
          return <ChatItem class={s.chatItem}></ChatItem>
        })}
      </div>
    </PageWrapper>
  }
})
