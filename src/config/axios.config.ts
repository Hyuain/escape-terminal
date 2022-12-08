import axios from 'axios'
import { hostConfig } from './host.config'

const skipAuthorizationUrls = new Set([
  '/api/v1/validation_codes',
  '/api/v1/sessions',
])

export const axiosConfig = () => {

  axios.defaults.baseURL = hostConfig.request

  axios.interceptors.request.use((config) => {
    if (!config.url) { return config }
    if (!skipAuthorizationUrls.has(config.url) && !config.headers?.Authorization) {
      const jwt = localStorage.getItem('jwt')
      config.headers!.Authorization = `Bearer ${jwt}`
    }
    console.log(config)
    return config
  })
}
