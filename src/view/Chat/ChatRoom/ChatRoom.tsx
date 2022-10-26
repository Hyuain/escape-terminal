import { defineComponent } from 'vue'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { Header } from '../../../components/Header/Header'
import { BubbleList } from './components/BubbleList/BubbleList'
import { ChatInput } from './components/ChatInput/ChatInput'
import s from './ChatRoom.module.scss'

export const ChatRoom = defineComponent({
  setup() {
    console.log('xxx')
    const socket = new WebSocket('ws://localhost:3000/websocket')
    socket.addEventListener('open', (x) => {
      console.log('xxxOpen', x)
      socket.send(JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'ChatChannel'
        })
      }))
    })
    socket.addEventListener('message', (e) => {
      const message = JSON.parse(e.data)
      if (message.type === 'ping') { return }
      console.log('xxxMessage', message)
    })
    return () => <PageWrapper>
      <Header title={'Name'}></Header>
      <BubbleList class={s.bubbleList}></BubbleList>
      <ChatInput></ChatInput>
    </PageWrapper>
  }
})
