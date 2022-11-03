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
  }

  const completeNewItem = <T extends keyof IStorageData>(key: T, newItem: Partial<StorageDataType<T>> = {}): StorageDataType<T> => {
    newItem.id = newItem.id || generateRandomId()
    if (key === 'maps') {
      newItem.name = newItem.name || ''
      ;(newItem as any).players = (newItem as any).players || []
    }
    return newItem as StorageDataType<T>
  }

  const add = <T extends keyof IStorageData>(key: T, newItem: Partial<StorageDataType<T>> = {}): string => {
    console.log('xxxNewItem', newItem)
    completeNewItem(key, newItem)
    MADataWrapper.data[key].push(newItem as any)
    saveData()
    return newItem.id as string
  }

  const addMany = <T extends keyof IStorageData>(key: T, newItems: Partial<StorageDataType<T>>[] = []): string[] => {
    console.log('xxxNewItems', newItems)
    newItems.forEach((newItem) => {
      completeNewItem(key, newItem)
    })
    MADataWrapper.data[key].push(...newItems as any)
    saveData()
    return newItems.map((item) => item.id) as string[]
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

  const getWrapper = () => {
    loadData()
    return MADataWrapper
  }

  // loadDataRisk
  const getOne = <T extends keyof IStorageData>(key: T, id: string): StorageDataType<T> | undefined => {
    loadData()
    return MADataWrapper.data[key].find((item) => item.id === id) as any
  }

  const movePlayer = (playerId: string, oldMapId?: string, newMapId?: string) => {
    const oldMap = oldMapId
      ? MADataWrapper.data.maps.find((item) => item.id === oldMapId)
      : null
    if (oldMap) {
      oldMap.players = oldMap.players.filter((item) => item !== playerId)
    }
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

  const getDefaultPlayers = (): Promise<IPlayer[]> => {
    return Promise.resolve([
      { id: 'xxx1', name: '1', maxHp: 10, hp: 10, monsters: [] },
      { id: 'xxx2', name: '2', maxHp: 10, hp: 10, monsters: [] },
      { id: 'xxx3', name: '3', maxHp: 10, hp: 10, monsters: [] },
    ])
  }

  return { getDefaultPlayers, MADataWrapper, add, addMany, remove, update, getWrapper, getOne, movePlayer }
})
