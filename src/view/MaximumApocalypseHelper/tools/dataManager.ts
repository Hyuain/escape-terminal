import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { IMap, IMonster, IPlayer, IStorageData, StorageDataType } from './dataManager.interface'
import { generateRandomId } from '../../../shared/tools'
import { MAMap } from '../MAMap/MAMap'

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
  console.log('xxxSetStorageData', data)
  localStorage.setItem(StorageKey, JSON.stringify(data))
}

export const useMADataStore = defineStore('ma_data', () => {
  const MADataWrapper = reactive({
    data: getDefaultData(),
  })

  const loadData = () => {
    MADataWrapper.data = getStorageData()
  }

  const saveData = () => {
    console.log('xxxSaveData')
    setStorageData(MADataWrapper.data)
  }

  const completeNewItem = <T extends keyof IStorageData>(key: T, newItem: any = {}): StorageDataType<T> => {
    newItem.id = newItem.id || generateRandomId()
    if (key === 'maps') {
      newItem.name = newItem.name || ''
      ;(newItem as any).players = (newItem as any).players || []
    } else if (key === 'monsters') {
      ;(newItem as any).hp = newItem.hp || newItem.maxHp
    } else if (key === 'players') {
      newItem.hp = newItem.hp || newItem.maxHp
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
    MADataWrapper.data[key] = (MADataWrapper.data[key] as any).filter((item: any) => item.id !== id) as any
    saveData()
  }

  const update = <T extends keyof IStorageData>(key: T, newItem: StorageDataType<T>) => {
    const oldItem = (MADataWrapper.data[key] as any).find((item: any) => item.id === newItem.id)
    console.log('xxxUpdate', oldItem, key, newItem)
    if (!oldItem) { return }
    Object.assign(oldItem, newItem)
    saveData()
  }

  const getWrapper = () => {
    loadData()
    return MADataWrapper
  }

  // loadDataRisk
  const getOne = <T extends keyof IStorageData>(key: T, id?: string): StorageDataType<T> | undefined => {
    loadData()
    return (MADataWrapper.data[key] as any).find((item: any) => item.id === id) as any
  }

  const movePlayer = (playerId: string, oldMapId?: string, newMapId?: string) => {
    const oldMap = oldMapId
      ? MADataWrapper.data.maps.find((item) => item.id === oldMapId)
      : null
    if (oldMap) {
      oldMap.players = oldMap.players.filter((item) => item !== playerId)
    } else {
      // if oldMap not specified, need search all maps to avoid duplication
      MADataWrapper.data.maps.forEach((item) => {
        item.players = item.players.filter((item) => item !== playerId)
      })
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

  const attachMonster = (monsterId: string, playerId: string) => {
    const player = MADataWrapper.data.players.find((player) => player.id === playerId)
    if (!player) { return }
    if (!player.monsters) {
      player.monsters = []
    }
    player.monsters.push(monsterId)
    saveData()
  }

  const detachMonster = (monsterId: string, playerId: string) => {
    const player = MADataWrapper.data.players.find((player) => player.id === playerId)
    if (!player) { return }
    player.monsters = (player.monsters || []).filter((id) => id !== monsterId)
    saveData()
  }

  const destroyMonster = (monsterId: string) => {
    remove('monsters', monsterId)
    MADataWrapper.data.players.forEach((player) => {
      player.monsters = (player.monsters || []).filter((id) => id !== monsterId)
    })
    saveData()
  }

  const getDefaultPlayers = (): Promise<IPlayer[]> => {
    return Promise.resolve([
      { id: 'xxx1', name: '1', maxHp: 10, hp: 10, monsters: [] },
      { id: 'xxx2', name: '2', maxHp: 10, hp: 10, monsters: [] },
      { id: 'xxx3', name: '3', maxHp: 10, hp: 10, monsters: [] },
    ])
  }

  const getDefaultMonsters = (): Promise<IMonster[]> => {
    return Promise.resolve([
      { id: 'xxx1', name: 'm1', maxHp: 10, hp: 10, atk: 5 },
      { id: 'xxx2', name: 'm2', maxHp: 10, hp: 10, atk: 6 },
      { id: 'xxx3', name: 'm3', maxHp: 10, hp: 10, atk: 7 },
    ])
  }

  const getMonsterAttachedPlayer = (monsterId?: string): IPlayer | undefined => {
    if (!monsterId) { return }
    return MADataWrapper.data.players.find((player) => {
      return player.monsters?.includes(monsterId)
    })
  }

  const getPlayerPosition = (playerId?: string): IMap | undefined => {
    if (!playerId) { return }
    return MADataWrapper.data.maps.find((map) => {
      return map.players?.includes(playerId)
    })
  }

  const getPlayersUsingMap = (mapId?: string): IPlayer[] => {
    if (!mapId) { return [] }
    const map = MADataWrapper.data.maps.find((map) => map.id === mapId)
    if (!map) { return [] }
    return MADataWrapper.data.players.filter((player) => map.players.includes(player.id))
  }

  return {
    getDefaultPlayers, getDefaultMonsters, MADataWrapper, add, addMany, remove, update, getWrapper, getOne,
    movePlayer, attachMonster, detachMonster, destroyMonster,
    getMonsterAttachedPlayer, getPlayerPosition, getPlayersUsingMap,
  }
})
