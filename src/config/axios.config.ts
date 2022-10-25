import axios from 'axios'

const skipAuthorizationUrls = new Set([
  '/api/v1/validation_codes',
  '/api/v1/sessions',
])

export const axiosConfig = () => {

  axios.defaults.baseURL = 'http://localhost:3000'

  axios.interceptors.request.use((config) => {
    if (!config.url) { return config }
    if (!skipAuthorizationUrls.has(config.url)) {
      const jwt = localStorage.getItem('jwt')
      config.headers!.Authorization = `Bearer ${jwt}`
    }
    console.log(config)
    return config
  })
}
