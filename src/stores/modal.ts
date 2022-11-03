import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useModal = defineStore('modal', () => {
  const modalData = reactive<{
    render?: any
  }>({
    render: null
  })

  const showModal = (params: {
    render?: () => any
  }) => {
    const { render } = params
    modalData.render = render
  }

  const closeModal = () => {
    modalData.render = null
  }

  return { showModal, closeModal, modalData }

})
