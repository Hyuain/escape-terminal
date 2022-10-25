import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {

  const user = reactive({
    userId: undefined,
    email: undefined,
  })

  const getUser = () => {
    return axios.get('/api/v1/me').then((res) => {
      const { data } = res
      user.userId = data.userId
      user.email = data.email
    })
  }
  return { getUser, user }
})
