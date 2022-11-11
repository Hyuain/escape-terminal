export enum SocketECommand {
  NEW_MESSAGE = 'newMessage',
}

export enum SocketType {
  WELCOME = 'welcome',
  CONFIRM_SUBSCRIPTION = 'confirm_subscription',
  PING = 'ping',
}

export interface ISocketMessage {
  eCommand: SocketECommand.NEW_MESSAGE,
}

export interface ISocketData {
  identifier?: string
  type?: SocketType
  message?: ISocketMessage
}

export interface IChat {
  id: number
  userId: number
  robotId: number
  direction: ChatDirection
  content: IChatContent
}

export interface IChatUserInfo {
  id: number
  avatar: string
  name: string
}

export interface IRawChat extends Omit<IChat, 'content'> {
  content: string
}

export enum ChatDirection {
  FROM_USER = 'from_user',
  FROM_ROBOT = 'from_robot',
}

export interface IChatContent<T extends ChatType = any> {
  type: T
  resource: TextResourceType<T>
}

export enum ChatType {
  TEXT = 1,
  IMAGE = 2,
}

export type TextResourceType<T> = T extends ChatType.TEXT ? ITextResource
  : any

export interface ITextResource {
  text: string
}
