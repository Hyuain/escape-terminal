import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { IMap, IPlayer, IStorageData, StorageDataType } from './dataManager.interface'
import { generateRandomId } from '../../../shared/tools'

const StorageKey = 'MA_HELPER'
const getDefaultData = (): IStorageData => {
  return {
    players: [],
    monsters: [],
    maps: [],
  }
}

const getStorageData = (): IStorageData => {
  return JSON.parse(localStorage.getItem(StorageKey) || JSON.stringify(getDefaultData()))
}

const setStorageData = (data: IStorageData) => {
  localStorage.setItem(StorageKey, JSON.stringify(data))
}

export const useMAData = defineStore('ma_data', () => {
  const dataWrapper = reactive({
    data: getDefaultData()
  })

  const loadData = () => {
    dataWrapper.data = getStorageData()
  }

  const saveData = () => {
    setStorageData(dataWrapper.data)
  }

  const add = <T extends keyof IStorageData>(key: T, newItem: Partial<StorageDataType<T>>): string => {
    newItem.id = generateRandomId()
    dataWrapper.data[key].push(newItem as any)
    saveData()
    return newItem.id
  }

  const remove = <T extends keyof IStorageData>(key: T, id: string) => {
    dataWrapper.data[key] = dataWrapper.data[key].filter((item) => item.id !== id) as any
    saveData()
  }

  const update = <T extends keyof IStorageData>(key: T, newItem: StorageDataType<T>) => {
    const oldItem = dataWrapper.data[key].find((item) => item.id === newItem.id)
    if (!oldItem) { return }
    Object.assign(oldItem, newItem)
    saveData()
  }

  const getAll = <T extends keyof IStorageData>(key: T): IStorageData[T] => {
    loadData()
    return dataWrapper.data[key]
  }

  const getOne = <T extends keyof IStorageData>(key: T, id: string): StorageDataType<T> | undefined => {
    loadData()
    return dataWrapper.data[key].find((item) => item.id === id) as any
  }

  const movePlayer = (playerId: string, oldMapId: string, newMapId?: string) => {
    const oldMap = dataWrapper.data.maps.find((item) => item.id === oldMapId)
    if (!oldMap) { throw new Error('Unknown old map') }
    oldMap.players = oldMap.players.filter((item) => item !== playerId)
    const newMap = newMapId
      ? dataWrapper.data.maps.find((item) => item.id === newMapId)
      : null
    if (!newMap) {
      add('maps', { players: [playerId] })
    } else {
      newMap.players.push(playerId)
    }
    saveData()
  }

  return { add, remove, update, getAll, getOne, movePlayer }
})
