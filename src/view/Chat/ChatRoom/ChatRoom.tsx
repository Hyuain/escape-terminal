import { defineComponent } from 'vue'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { Header } from '../../../components/Header/Header'
import { BubbleList } from './components/BubbleList/BubbleList'
import { ChatInput } from './components/ChatInput/ChatInput'
import s from './ChatRoom.module.scss'

export const ChatRoom = defineComponent({
  setup() {
    return () => <PageWrapper>
      <Header title={'Name'}></Header>
      <BubbleList class={s.bubbleList}></BubbleList>
      <ChatInput></ChatInput>
    </PageWrapper>
  }
})
