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
    titleRender?: any
    content?: string
    contentRender?: any
    list?: string[]
    onClickListItem?: any
  }>({
    isShowModal: false,
    render: null,
    onConfirm: null,
    onCancel: null,
    title: '',
    titleRender: null,
    content: '',
    contentRender: null,
    list: undefined,
    onClickListItem: null
  })

  const showModal = (params: IModalParams) => {
    console.log('xxx2', modalData.onClickListItem)
    modalData.render = params.render
    modalData.title = params.title
    modalData.titleRender = params.titleRender
    modalData.content = params.content
    modalData.contentRender = params.contentRender
    modalData.onConfirm = params.onConfirm
    modalData.onCancel = params.onCancel
    modalData.list = params.list
    modalData.onClickListItem = params.onClickListItem
    console.log('xxx3', modalData.onClickListItem)
    modalData.isShowModal = true
  }

  const closeModal = () => {
    modalData.render = null
    modalData.onConfirm = null
    modalData.onCancel = null
    modalData.title = ''
    modalData.content = ''
    modalData.list = undefined
    modalData.onClickListItem = null
    modalData.isShowModal = false
  }

  return { showModal, closeModal, modalData }

})
