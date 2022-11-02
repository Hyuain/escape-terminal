export enum MAHelperNavBarLabel {
  MAP = 'Map',
  PLAYERS = 'Players',
  MONSTERS = 'Monsters',
}

export interface IAction {
  label: MAHelperNavBarLabel,
  icon: string
  path: string
}
