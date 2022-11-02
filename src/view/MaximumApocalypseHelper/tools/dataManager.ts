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

export const useMADataStore = defineStore('ma_data', () => {
  const MADataWrapper = reactive({
    data: getDefaultData()
  })

  const loadData = () => {
    MADataWrapper.data = getStorageData()
  }

  const saveData = () => {
    setStorageData(MADataWrapper.data)
    loadData()
  }

  const add = <T extends keyof IStorageData>(key: T, newItem: Partial<StorageDataType<T>> = {}): string => {
    console.log('xxxNewItem', newItem)
    newItem.id = generateRandomId()
    if (key === 'maps') {
      newItem.name = newItem.name || ''
      ;(newItem as any).players = (newItem as any).players || []
    }
    MADataWrapper.data[key].push(newItem as any)
    saveData()
    return newItem.id
  }

  const remove = <T extends keyof IStorageData>(key: T, id: string) => {
    MADataWrapper.data[key] = MADataWrapper.data[key].filter((item) => item.id !== id) as any
    saveData()
  }

  const update = <T extends keyof IStorageData>(key: T, newItem: StorageDataType<T>) => {
    const oldItem = MADataWrapper.data[key].find((item) => item.id === newItem.id)
    if (!oldItem) { return }
    Object.assign(oldItem, newItem)
    saveData()
  }

  const getAll = <T extends keyof IStorageData>(key: T): IStorageData[T] => {
    loadData()
    console.log('xxxGetAll')
    return MADataWrapper.data[key]
  }

  const getOne = <T extends keyof IStorageData>(key: T, id: string): StorageDataType<T> | undefined => {
    loadData()
    return MADataWrapper.data[key].find((item) => item.id === id) as any
  }

  const movePlayer = (playerId: string, oldMapId: string, newMapId?: string) => {
    const oldMap = MADataWrapper.data.maps.find((item) => item.id === oldMapId)
    if (!oldMap) { throw new Error('Unknown old map') }
    oldMap.players = oldMap.players.filter((item) => item !== playerId)
    const newMap = newMapId
      ? MADataWrapper.data.maps.find((item) => item.id === newMapId)
      : null
    if (!newMap) {
      add('maps', { players: [playerId] })
    } else {
      newMap.players.push(playerId)
    }
    saveData()
  }

  return { MADataWrapper, add, remove, update, getAll, getOne, movePlayer }
})
