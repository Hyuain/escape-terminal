import { hostPrivateConfig } from '@/config/host.private'

export const hostConfig = {
  request: 'http://localhost:3000',
  websocket: 'ws://localhost:3000/websocket',
  oss: 'https://escape-bucket.oss-cn-guangzhou.aliyuncs.com',
  // request: 'http://192.168.43.164:3000',
  // websocket: 'ws://192.168.43.164:3000/websocket',
  ...hostPrivateConfig as any,
}
