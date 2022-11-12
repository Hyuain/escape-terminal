export interface IProfileInfo {
  id: number
  name: string
  avatar: string
  email?: string
}

export interface IProfileFormItem {
  label: string
  key: string
  content?: string
  isEditable?: boolean
}
