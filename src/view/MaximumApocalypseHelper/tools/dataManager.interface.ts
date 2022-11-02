export interface IStorageData {
  players: IPlayer[]
  monsters: IMonster[]
  maps: IMap[]
}

export type StorageDataType<T> = T extends 'players' ? IPlayer
  : T extends 'monsters' ? IMonster
    : T extends 'maps' ? IMap
      : any

export interface IPlayer {
  id: string
  name?: string
  monsters: string[]
}

export interface IMonster {
  id: string
  name?: string
}

export interface IMap {
  id: string
  name?: string
  players: string[]
}
