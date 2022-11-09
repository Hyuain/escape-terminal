import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { IMap, IMonster, IPlayer, IStorageData, IStorageDataExtra, StorageDataType } from './dataManager.interface'
import { generateRandomId } from '../../../shared/tools'
import axios from 'axios'

const StorageKey = 'MA_HELPER'

const getStorageData = (): IStorageData => {
  return JSON.parse(localStorage.getItem(StorageKey) || '{}')
}

const setStorageData = (data: IStorageDataExtra) => {
  console.log('xxxSetStorageData', data)
  localStorage.setItem(StorageKey, JSON.stringify(data))
}

export const useMADataStore = defineStore('ma_data', () => {
  const MADataWrapper = reactive<{ data: IStorageDataExtra }>({
    data: {
      players: [],
      monsters: [],
      maps: [],
    },
  })
  const isDataLoaded = ref(false)

  const loadData = async () => {
    if (isDataLoaded.value) { return }
    const dataFromLocal: IStorageDataExtra = getStorageData()
    const resFromCloud = (await axios.get('/api/v1/ma_helper_stores')).data[0]
    const dataFromCloud: IStorageDataExtra = JSON.parse(resFromCloud.content)
    const dataFromLocalTimestamp = new Date(dataFromLocal.timestamp || 0).getTime()
    const dataFromCloudTimestamp = new Date(dataFromCloud.timestamp || 0).getTime()
    MADataWrapper.data = dataFromLocalTimestamp > dataFromCloudTimestamp ? dataFromLocal : dataFromCloud
    MADataWrapper.data.id = resFromCloud.id
    isDataLoaded.value = true
  }

  const saveData = () => {
    const timestamp = new Date().toISOString()
    const data = {
      ...MADataWrapper.data,
      timestamp,
    }
    setStorageData(data)
    axios.put(`/api/v1/ma_helper_stores/${MADataWrapper.data.id}`, {
      content: JSON.stringify(data),
      timestamp,
    }).then()
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
    return MADataWrapper
  }

  const getOne = <T extends keyof IStorageData>(key: T, id?: string): StorageDataType<T> | undefined => {
    // await loadData()
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

  const removePlayer = (playerId: string) => {
    remove('players', playerId)
    MADataWrapper.data.maps.forEach((map) => {
      map.players = (map.players || []).filter((id) => id !== playerId)
    })
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
      { id: 'xxx1', name: '1', maxHp: 10, hp: 10, monsters: [] },
      { id: 'xxx2', name: '2', maxHp: 10, hp: 10, monsters: [] },
      { id: 'xxx3', name: '3', maxHp: 10, hp: 10, monsters: [] },
      { id: 'xxx1', name: '1', maxHp: 10, hp: 10, monsters: [] },
      { id: 'xxx2', name: '2', maxHp: 10, hp: 10, monsters: [] },
      { id: 'xxx3', name: '3', maxHp: 10, hp: 10, monsters: [] },
      { id: 'xxx1', name: '1', maxHp: 10, hp: 10, monsters: [] },
      { id: 'xxx2', name: '2', maxHp: 10, hp: 10, monsters: [] },
      { id: 'xxx3', name: '3', maxHp: 10, hp: 10, monsters: [] },
    ])
  }

  const getDefaultMonsters = (): Promise<IMonster[]> => {
    return Promise.resolve([
      { id: 'xxx1', name: '1', maxHp: 10, hp: 10, atk: 12 },
      { id: 'xxx2', name: '2', maxHp: 10, hp: 10, atk: 12 },
      { id: 'xxx3', name: '3', maxHp: 10, hp: 10, atk: 12 },
      { id: 'xxx1', name: '1', maxHp: 10, hp: 10, atk: 12 },
      { id: 'xxx2', name: '2', maxHp: 10, hp: 10, atk: 12 },
      { id: 'xxx3', name: '3', maxHp: 10, hp: 10, atk: 12 },
      { id: 'xxx1', name: '1', maxHp: 10, hp: 10, atk: 12 },
      { id: 'xxx2', name: '2', maxHp: 10, hp: 10, atk: 12 },
      { id: 'xxx3', name: '3', maxHp: 10, hp: 10, atk: 12 },
      { id: 'xxx1', name: '1', maxHp: 10, hp: 10, atk: 12 },
      { id: 'xxx2', name: '2', maxHp: 10, hp: 10, atk: 12 },
      { id: 'xxx3', name: '3', maxHp: 10, hp: 10, atk: 12 },
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
    loadData,
    getDefaultPlayers, getDefaultMonsters, MADataWrapper, add, addMany, remove, update, getWrapper, getOne,
    movePlayer, removePlayer, attachMonster, detachMonster, destroyMonster,
    getMonsterAttachedPlayer, getPlayerPosition, getPlayersUsingMap,
  }
})
