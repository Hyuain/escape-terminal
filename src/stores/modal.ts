import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { IModalParams } from '@/stores/modal.interface'

export const useModal = defineStore('modal', () => {
  const modalData = reactive<{
    isShowModal: boolean
    render?: any
    onConfirm?: any
    onCancel?: any
    title?: string
    content?: string
  }>({
    isShowModal: false,
    render: null,
    onConfirm: null,
    onCancel: null,
    title: '',
    content: '',
  })

  const showModal = (params: IModalParams) => {
    modalData.render = params.render
    modalData.title = params.title
    modalData.content = params.content
    modalData.onConfirm = params.onConfirm
    modalData.onCancel = params.onCancel
    modalData.isShowModal = true
  }

  const closeModal = () => {
    modalData.render = null
    modalData.onConfirm = null
    modalData.onCancel = null
    modalData.title = ''
    modalData.content = ''
    modalData.isShowModal = false
  }

  return { showModal, closeModal, modalData }

})
