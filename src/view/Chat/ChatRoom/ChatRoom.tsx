import { defineComponent, nextTick, reactive, ref } from 'vue'
import { PageWrapper } from '@/components/PageWrapper/PageWrapper'
import { Header } from '@/components/Header/Header'
import { BubbleList } from './components/BubbleList/BubbleList'
import { ChatInput } from './components/ChatInput/ChatInput'
import s from './ChatRoom.module.scss'
import axios from 'axios'
import { ChatType, IChat, IChatContent, IRawChat, ISocketData, SocketECommand, SocketType } from '../Chat.interface'
import { assembleQuery } from '@/shared/tools'
import { hostConfig } from '@/config/host.config'
import { useRouter } from 'vue-router'

const BOTTOM_THRESHOLD = 100
const TOP_THRESHOLD = 1

const removeDuplicateMessages = (existingMessages: IChat[], newMessages: IChat[]): IChat[] => {
  const existingMessageIdSet = new Set(existingMessages.map((message) => message.id))
  return newMessages.filter((message) => {
    const isDuplicate = existingMessageIdSet.has(message.id)
    existingMessageIdSet.add(message.id)
    return !isDuplicate
  })
}

const connectSocket = (): WebSocket => {
  const jwt = localStorage.getItem('jwt') || ''
  const socket = new WebSocket(`${hostConfig.websocket}?jwt=${jwt}`)
  socket.addEventListener('open', (x) => {
    socket.send(JSON.stringify({
      command: 'subscribe',
      identifier: JSON.stringify({
        channel: 'ChatChannel'
      })
    }))
  })
  return socket
}

export const ChatRoom = defineComponent({
  setup() {
    const bubbleListRef = ref()
    const router = useRouter()

    const isFetching = ref(false)
    const data = reactive<{
      messages: IChat[]
      socket: WebSocket | null,
    }>({
      messages: [],
      socket: null,
    })

    const getBubbleListScrollWrapper = () => {
      return bubbleListRef.value.$refs.wrapper
    }

    const getMessages = async (params: { lastId?: number, limit?: number } = {}): Promise<IChat[]> => {
      if (isFetching.value) { return [] }
      isFetching.value = true
      const { lastId, limit } = params
      const res = await axios.get(`/api/v1/messages?${assembleQuery({ robotId: 1, lastId, limit })}`)
      const messages = res.data || []
      isFetching.value = false
      return messages.map((message: IRawChat): IChat => {
        return {
          ...message,
          content: JSON.parse(message.content),
        }
      })
    }

    const scrollToBottom = () => {
      setTimeout(() => {
        const wrapper = getBubbleListScrollWrapper()
        wrapper.scrollTop = wrapper.scrollHeight
      })
    }

    data.socket = connectSocket()
    data.socket.addEventListener('message', (e) => {
      const socketData: ISocketData = JSON.parse(e.data)
      if (socketData.type === SocketType.PING) { return }
      const socketMessage = socketData.message
      console.log('xxxData')
      console.log(socketData)
      if (!socketMessage) { return }
      if (socketMessage.eCommand === SocketECommand.NEW_MESSAGE) {
        // get at most 5 messages each time, in case of network error
        getMessages({
          limit: 5,
        }).then((chatMessages) => {
          chatMessages = removeDuplicateMessages(data.messages, chatMessages)
          if (!chatMessages.length) { return }
          data.messages.push(...chatMessages)
          const wrapper = getBubbleListScrollWrapper()
          const { scrollHeight, clientHeight, scrollTop } = wrapper
          const bottomDistance = scrollHeight - clientHeight - scrollTop
          if (bottomDistance < BOTTOM_THRESHOLD) {
            scrollToBottom()
          }
        })
      }
    })

    const handleSendMessage = (value: string) => {
      const messageContent: IChatContent<ChatType.TEXT> = {
        type: ChatType.TEXT,
        resource: {
          text: value,
        }
      }
      axios.post('/api/v1/messages', {
        toId: 1,
        content: JSON.stringify(messageContent),
      }).then()
    }

    getMessages().then((messages) => {
      data.messages = messages
      scrollToBottom()
    })

    const scrollToPreviousPosition = () => {

    }

    const handleScroll = (e: any) => {
      const scrollTop = e.target.scrollTop
      const lastId = data.messages[0].id
      if (lastId === undefined) { return }
      if (scrollTop < TOP_THRESHOLD) {
        getMessages({ lastId }).then((messages) => {
          console.log('xxMessages', messages)
          const wrapper = getBubbleListScrollWrapper()
          const previousHeight = wrapper.scrollHeight
          data.messages.unshift(...messages)
          nextTick(() => {
            wrapper.scrollTop = wrapper.scrollHeight - previousHeight
          })
        })
      }
    }

    return () => <PageWrapper>
      <Header onClickBack={() => router.replace('/home')} title={'Name'}></Header>
      <BubbleList ref={bubbleListRef} messages={data.messages} onScroll={handleScroll} class={s.bubbleList}></BubbleList>
      <ChatInput onSend={handleSendMessage}></ChatInput>
    </PageWrapper>
  }
})
