import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {

  const user = reactive({
    userId: undefined,
    email: undefined,
    avatar: undefined,
    nickname: undefined,
  })

  const getUser = () => {
    if (user.userId) { return }
    axios.get('/api/v1/me').then((res) => {
      const { data } = res
      user.userId = data.userId
      user.email = data.email
      user.avatar = data.avatar
      user.nickname = data.nickname
    })
  }
  return { getUser, user }
})
