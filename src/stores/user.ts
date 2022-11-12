import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {

  const user = reactive({
    userId: undefined,
    email: undefined,
    avatar: undefined,
    nickname: undefined,
  })
  const router = useRouter()

  const getUser = async () => {
    if (user.userId) { return user }
    const res = await axios.get('/api/v1/me')
    const { data } = res
    user.userId = data.userId
    user.email = data.email
    user.avatar = data.avatar
    user.nickname = data.nickname
    return user
  }

  const signOut = () => {
    user.userId = undefined
    user.email = undefined
    user.avatar = undefined
    user.nickname = undefined
    localStorage.removeItem('jwt')
    router.replace('/sign_in')
  }

  return { getUser, user, signOut }
})
