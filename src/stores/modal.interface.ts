export interface IModalParams {
  render?: any
  title?: string
  content?: string
  onConfirm?: () => void
  onCancel?: () => void
  list?: string[]
  onClickListItem?: (index: number) => void
}
