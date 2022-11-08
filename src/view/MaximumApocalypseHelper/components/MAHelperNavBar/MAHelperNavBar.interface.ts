export enum MAHelperNavBarLabel {
  MAP = 'Map',
  PLAYERS = 'Players',
  MONSTERS = 'Monsters',
}

export interface IAction {
  label: MAHelperNavBarLabel
  icon: any
  path: string
}
