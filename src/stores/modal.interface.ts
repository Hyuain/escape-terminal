export interface IModalParams {
  render?: any
  title?: string
  titleRender?: any
  content?: string
  contentRender?: any
  onConfirm?: () => void
  onCancel?: () => void
  list?: string[]
  onClickListItem?: (index: number) => void
}
