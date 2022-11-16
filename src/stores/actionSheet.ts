import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { IActionSheetItem } from './actionSheet.interface'

export const useActionSheet = defineStore('action_sheet', () => {
  const actionSheetData = reactive<{
    list: IActionSheetItem[]
    resolve: any,
    reject: any,
  }>({
    list: [],
    resolve: null,
    reject: null,
  })

  const addListener = (resolve: any, reject: any) => {
    actionSheetData.resolve = resolve
    actionSheetData.reject = reject
  }

  const showActionSheet = (sheetList: IActionSheetItem[]): Promise<number> => {
    console.log('xxxSHowActionSheet', sheetList)
    actionSheetData.list = sheetList
    return new Promise((resolve, reject) => {
      addListener(resolve, reject)
    })
  }

  const closeActionSheet = (index: number) => {
    actionSheetData.list = []
    if (actionSheetData.reject && actionSheetData.resolve) {
      if (index < 0) {
        actionSheetData.reject()
      } else {
        actionSheetData.resolve(index)
      }
    }
    actionSheetData.resolve = null
    actionSheetData.reject = null
  }

  return { showActionSheet, closeActionSheet, actionSheetData }
})
