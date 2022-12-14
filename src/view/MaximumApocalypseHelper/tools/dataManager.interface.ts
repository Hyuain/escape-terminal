export interface IStorageData {
  players: IPlayer[]
  monsters: IMonster[]
  maps: IMap[]
}

export interface IStorageDataExtra extends IStorageData {
  id?: number
  timestamp?: number | string | Date
}

export type StorageDataType<T> = T extends 'players' ? IPlayer
  : T extends 'monsters' ? IMonster
    : T extends 'maps' ? IMap
      : any

export interface IPlayer {
  id: string
  maxHp: number
  name?: string
  monsters?: string[]
  hp?: number
  description?: string
}

export interface IMonster {
  id: string
  name?: string
  hp?: number
  maxHp: number
  atk: number
  description?: string
  category?: string
}

export interface IMap {
  id: string
  name?: string
  players: string[]
}
