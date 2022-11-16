import { hostConfig } from '@/config/host.config'
import axios from 'axios'

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

export const getOSSUploadParams = async () => {
  const res = await axios.get('/api/v1/externals/get_oss_params')
  return res.data
}

export const chooseAndUploadImage = (): Promise<any> => {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.addEventListener('change', () => {
      if (!input.files) { return }
      const file = input.files[0]
      onFileChosen(file).then((res) => {
        resolve(res)
      })
    })
    input.click()
  })
}

export const onFileChosen = async (file: File) => {
  const ossForm = await getOSSUploadParams()
  const formData = new FormData()
  for (const [key, value] of Object.entries(ossForm)) {
    formData.append(key, value as string)
  }
  formData.append('file', file)
  return await axios.post(hostConfig.oss, formData)
}

export const generateRandomString = (length = 4) => {
  return Math.random().toString(36).slice(2, 2 + length)
}
