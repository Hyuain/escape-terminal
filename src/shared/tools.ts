import { hostConfig } from '@/config/host.config'

export const assembleQuery = (obj: any): string => {
  return Object.entries(obj)
    .filter(([key, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

export const generateRandomId = (index?: number) => {
  return `${Date.now()}-${Math.round(Math.random() * 1000)}-${index === undefined ? Math.round(Math.random() * 1000) : index}`
}

export const getImageUrl = (url: string): string => {
  if (!url) { return '' }
  console.log('xxxUrl')
  return hostConfig.oss + url
}
